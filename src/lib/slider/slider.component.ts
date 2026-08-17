import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'k-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  host: {
    '[class.show-info]': 'showInfo()',
    '[class.left-to-right]': 'direction() === "left-to-right"',
    '[class.bottom-to-top]': 'direction() === "bottom-to-top"',
  },
})
export class SliderComponent implements AfterViewInit {
  label = input.required<string>();
  min = input(0);
  max = input(100);
  startingValue = input(0);
  showLabel = input(true);
  step = input(0.1);
  value = signal(0);
  valueChanged = output<number>();
  direction = input<'left-to-right' | 'bottom-to-top'>('left-to-right');

  startingValueChangedEffect = effect(() => this.value.set(this.startingValue() ?? ''));

  showInfo = input(true);
  showTooltip = input(true);

  railRef = viewChild.required<ElementRef<HTMLElement>>('rail');
  handleRef = viewChild.required<ElementRef<HTMLElement>>('handle');

  isDragging = false;

  handlePosition = computed(() => {
    return ((this.value() - this.min()) / (this.max() - this.min())) * 100;
  });

  constructor() {
    effect(() => {
      this.valueChanged.emit(this.value());
    });
  }

  #destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    const rail = this.railRef().nativeElement;
    const handle = this.handleRef().nativeElement;

    const onMouseDown = (e: MouseEvent) => {
      if (e.target === handle) this.isDragging = true;
    };
    const onMouseUp = () => {
      this.isDragging = false;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (this.isDragging) this.#updateValue(e);
    };
    const onRailClick = (e: MouseEvent) => this.#updateValue(e);

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
    rail.addEventListener('click', onRailClick);

    this.#destroyRef.onDestroy(() => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
      rail.removeEventListener('click', onRailClick);
    });
  }

  #updateValue(event: MouseEvent) {
    const railElement = this.railRef().nativeElement;
    const railRect = railElement.getBoundingClientRect();
    const handleElement = this.handleRef().nativeElement;
    const handleRect = handleElement.getBoundingClientRect();

    const { clickPosition, availableSpace } = (() => {
      if (this.direction() === 'bottom-to-top') {
        // For vertical slider, use Y coordinates (inverted - bottom is 0, top is max)
        return {
          clickPosition: railRect.bottom - event.clientY - handleRect.height / 2,
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

    const newValue = this.min() + (clickPosition / availableSpace) * (this.max() - this.min());
    const steppedValue = Math.round(newValue / this.step()) * this.step();
    const decimalPlacesOfStep = this.step().toString().split('.').at(1)?.length ?? 0;
    const roundedValue = parseFloat(steppedValue.toFixed(decimalPlacesOfStep));
    this.value.set(Math.min(Math.max(roundedValue, this.min()), this.max()));
  }
}
