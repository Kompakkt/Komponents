import {
  booleanAttribute,
  Component,
  ElementRef,
  HostBinding,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'k-textarea',
  imports: [],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  host: { '[class]': '"size-" + size()' },
})
export class TextareaComponent implements FormValueControl<string> {
  textarea = viewChild.required<ElementRef<HTMLTextAreaElement>>('textarea');

  size = input<'sm' | 'md' | 'lg'>('md');
  label = input.required<string>();
  placeholder = input('');

  value = model('');

  prefix = input('');
  suffix = input('');

  minRows = input<number | string>(4, { alias: 'min-rows' });
  maxRows = input<number | string>(24, { alias: 'max-rows' });
  resize = input<'none' | 'both' | 'horizontal' | 'vertical'>('vertical', {
    alias: 'resize',
  });

  disabled = input(false, { transform: booleanAttribute });
  readonly = input(false, { transform: booleanAttribute });
  required = input(false, { transform: booleanAttribute });
  invalid = input(false);
  errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  // Defaults to true so standalone consumers passing [invalid] see the state
  // immediately; the [formField] directive writes false on init when bound.
  touched = input(true);
  touch = output<void>();

  onValueChangeEvent(event: Event) {
    const el = event.target as HTMLInputElement;
    this.value.set(el.value);
  }

  @HostBinding('style.--resize')
  get resizeStyle() {
    return this.resize();
  }

  @HostBinding('style.--min-rows')
  get minRowsStyle() {
    return +this.minRows();
  }

  @HostBinding('style.--max-rows')
  get maxRowsStyle() {
    return +this.maxRows();
  }
}
