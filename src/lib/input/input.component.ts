import {
  booleanAttribute,
  Component,
  computed,
  HostBinding,
  input,
  model,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';

export type InputType = 'text' | 'number' | 'username' | 'password' | 'email' | 'tel' | 'url';

@Component({
  selector: 'k-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  host: { '[class]': '"size-" + size()' },
})
export class InputComponent implements FormValueControl<string>, OnInit {
  size = input<'sm' | 'md' | 'lg'>('md');
  label = input.required<string>();
  floatingLabel = input(false, { transform: booleanAttribute });
  type = input<InputType>('text');
  autocomplete = input<string>('off');
  placeholder = input('');

  value = model('');
  prefix = input('');
  suffix = input('');

  disabled = input(false, { transform: booleanAttribute });
  readonly = input(false, { transform: booleanAttribute });
  required = input(false, { transform: booleanAttribute });
  invalid = input(false);
  errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  // Defaults to true so standalone consumers passing [invalid] see the state
  // immediately; the [formField] directive writes false on init when bound.
  touched = input(true);
  touch = output<void>();

  // When bound to a Signal Form field, schema constraints (min/max) are written
  // into these inputs by the FormField directive and take priority. Without a
  // schema rule the directive writes `undefined`, so fall back to the static value.
  // The FormUiControl contract types min/max against the string value type.
  min = input<string | undefined, unknown>(undefined, {
    transform: v => (typeof v === 'number' || typeof v === 'string' ? String(v) : undefined),
  });
  max = input<string | undefined, unknown>(undefined, {
    transform: v => (typeof v === 'number' || typeof v === 'string' ? String(v) : undefined),
  });
  #staticMin?: string;
  #staticMax?: string;
  effectiveMin = computed(() => this.min() ?? this.#staticMin);
  effectiveMax = computed(() => this.max() ?? this.#staticMax);

  focused = signal(false);

  @HostBinding('class.floating-label')
  get isFloatingLabel() {
    return this.floatingLabel();
  }

  ngOnInit(): void {
    this.#staticMin = this.min();
    this.#staticMax = this.max();
  }

  onValueChangeEvent(event: Event) {
    const el = event.target as HTMLInputElement;
    this.value.set(el.value);
  }
}
