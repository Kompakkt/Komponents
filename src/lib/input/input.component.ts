import {
  booleanAttribute,
  Component,
  effect,
  HostBinding,
  input,
  output,
  signal,
} from '@angular/core';

export type InputType = 'text' | 'number' | 'username' | 'password' | 'email' | 'tel' | 'url';

@Component({
  selector: 'k-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  min = input<number>(0);
  max = input<number>(100);

  label = input.required<string>();
  floatingLabel = input(false, { transform: booleanAttribute });
  type = input<InputType>('text');
  autocomplete = input<string>('off');
  placeholder = input('');

  startingValue = input<string | number>();
  value = signal('');
  valueChanged = output<{ value: string; valueAsNumber: number }>();

  prefix = input('');
  suffix = input('');

  focused = signal(false);

  @HostBinding('class.floating-label')
  get isFloatingLabel() {
    return this.floatingLabel();
  }

  constructor() {
    effect(() => {
      this.valueChanged.emit({ value: this.value(), valueAsNumber: Number(this.value()) });
    });
    effect(() => {
      const sv = this.startingValue();
      if (sv === undefined || sv === this.value()) return;
      this.#updateValue(sv);
    });
  }

  #updateValue(value: string | number) {
    if (this.type() === 'number') {
      this.value.set(value.toString());
    } else {
      this.value.set(value.toString());
    }
  }

  onValueChangeEvent(event: Event) {
    const el = event.target as HTMLInputElement;
    this.#updateValue(el.value);
  }
}
