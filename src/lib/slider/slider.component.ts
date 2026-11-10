import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  OnInit,
  output,
  viewChild,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'k-slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  host: {
    '[class.show-info]': 'showInfo()',
    '[class.left-to-right]': 'direction() === "left-to-right"',
    '[class.bottom-to-top]': 'direction() === "bottom-to-top"',
  },
})
export class SliderComponent implements FormValueControl<number>, AfterViewInit, OnInit {
  label = input.required<string>();
  showLabel = input(true);
  step = input(0.1);
  value = model(0);
  direction = input<'left-to-right' | 'bottom-to-top'>('left-to-right');

  disabled = input(false);
  readonly = input(false);
  invalid = input(false);
  touched = input(false);
  touch = output<void>();

  // When bound to a Signal Form field, schema constraints (min/max) are written
  // into these inputs by the FormField directive and take priority. Without a
  // schema rule the directive writes `undefined`, so fall back to the static value.
  min = input<number | undefined>(0);
  max = input<number | undefined>(100);
  #staticMin?: number;
  #staticMax?: number;
  effectiveMin = computed(() => this.min() ?? this.#staticMin ?? 0);
  effectiveMax = computed(() => this.max() ?? this.#staticMax ?? 100);

  showInfo = input(true);
  showTooltip = input(true);

  railRef = viewChild.required<ElementRef<HTMLElement>>('rail');
  handleRef = viewChild.required<ElementRef<HTMLElement>>('handle');

  isDragging = false;

  handlePosition = computed(() => {
    return (
      ((this.value() - this.effectiveMin()) / (this.effectiveMax() - this.effectiveMin())) * 100
    );
  });

  #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.#staticMin = this.min();
    this.#staticMax = this.max();
  }

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
    if (this.disabled() || this.readonly()) return;

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

    const newValue =
      this.effectiveMin() +
      (clickPosition / availableSpace) * (this.effectiveMax() - this.effectiveMin());
    const steppedValue = Math.round(newValue / this.step()) * this.step();
    const decimalPlacesOfStep = this.step().toString().split('.').at(1)?.length ?? 0;
    const roundedValue = parseFloat(steppedValue.toFixed(decimalPlacesOfStep));
    this.value.set(Math.min(Math.max(roundedValue, this.effectiveMin()), this.effectiveMax()));
  }
}
