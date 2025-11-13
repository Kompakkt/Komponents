import { AsyncPipe } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  computed,
  effect,
  input,
  output,
  signal,
  viewChild,
} from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import {
  Subscription,
  combineLatest,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  merge,
  skip,
} from "rxjs";

@Component({
  selector: "k-slider",
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: "./slider.component.html",
  styleUrl: "./slider.component.scss",
  host: {
    "[class.show-info]": "showInfo()",
    "[class.left-to-right]": 'direction() === "left-to-right"',
    "[class.bottom-to-top]": 'direction() === "bottom-to-top"',
  },
})
export class SliderComponent implements AfterViewInit, OnInit, OnDestroy {
  label = input.required<string>();
  min = input(0);
  max = input(100);
  startingValue = input(0);
  showLabel = input(true);
  step = input(0.1);
  value = signal(0);
  value$ = toObservable(this.value).pipe(skip(2));
  valueChanged = output<number>();
  direction = input<"left-to-right" | "bottom-to-top">("left-to-right");

  startingValueChangedEffect = effect(() =>
    this.value.set(this.startingValue() ?? ""),
  );

  showInfo = input(true);
  showTooltip = input(true);

  railRef = viewChild.required<ElementRef<HTMLElement>>("rail");
  handleRef = viewChild.required<ElementRef<HTMLElement>>("handle");

  isDragging$ = merge(
    fromEvent<MouseEvent>(document, "mousedown").pipe(
      filter((event) => event.target === this.handleRef().nativeElement),
    ),
    fromEvent<MouseEvent>(document, "mouseup"),
  ).pipe(
    map((event) => event.type === "mousedown"),
    distinctUntilChanged(),
  );

  handlePosition = computed(() => {
    return ((this.value() - this.min()) / (this.max() - this.min())) * 100;
  });

  valueSubscription?: Subscription;
  ngOnInit(): void {
    this.valueSubscription = this.value$.subscribe((value) => {
      this.valueChanged.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.valueSubscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
    combineLatest([
      fromEvent<MouseEvent>(document, "mousemove"),
      this.isDragging$,
    ])
      .pipe(filter(([_, isDragging]) => isDragging))
      .subscribe(([event]) => this.#updateValue(event));
    fromEvent<MouseEvent>(this.railRef().nativeElement, "click").subscribe(
      (event) => this.#updateValue(event),
    );
  }

  #updateValue(event: MouseEvent) {
    const railElement = this.railRef().nativeElement;
    const railRect = railElement.getBoundingClientRect();
    const handleElement = this.handleRef().nativeElement;
    const handleRect = handleElement.getBoundingClientRect();

    const { clickPosition, availableSpace } = (() => {
      if (this.direction() === "bottom-to-top") {
        // For vertical slider, use Y coordinates (inverted - bottom is 0, top is max)
        return {
          clickPosition:
            railRect.bottom - event.clientY - handleRect.height / 2,
          availableSpace: railRect.height - handleRect.height,
        };
      } else {
        // For horizontal slider, use X coordinates
        return {
          clickPosition: event.clientX - railRect.left - handleRect.width / 2,
          availableSpace: railRect.width - handleRect.width,
        };
      }
    })();

    const newValue =
      this.min() + (clickPosition / availableSpace) * (this.max() - this.min());
    const steppedValue = Math.round(newValue / this.step()) * this.step();
    const decimalPlacesOfStep =
      this.step().toString().split(".").at(1)?.length ?? 0;
    const roundedValue = parseFloat(steppedValue.toFixed(decimalPlacesOfStep));
    this.value.set(Math.min(Math.max(roundedValue, this.min()), this.max()));
  }
}
