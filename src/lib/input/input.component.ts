import { booleanAttribute, Component, HostBinding, input, model, signal } from '@angular/core';

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

  value = model('');
  prefix = input('');
  suffix = input('');

  focused = signal(false);

  @HostBinding('class.floating-label')
  get isFloatingLabel() {
    return this.floatingLabel();
  }

  onValueChangeEvent(event: Event) {
    const el = event.target as HTMLInputElement;
    this.value.set(el.value);
  }
}
