import {
  Component,
  effect,
  ElementRef,
  HostBinding,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'k-textarea',
  standalone: true,
  imports: [],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
})
export class TextareaComponent {
  textarea = viewChild.required<ElementRef<HTMLTextAreaElement>>('textarea');

  label = input.required<string>();
  placeholder = input('');

  startingValue = input<string>();
  value = signal('');
  valueChanged = output<{ value: string }>();

  prefix = input('');
  suffix = input('');

  minRows = input<number | string>(4, { alias: 'min-rows' });
  maxRows = input<number | string>(24, { alias: 'max-rows' });
  resize = input<'none' | 'both' | 'horizontal' | 'vertical'>('vertical', {
    alias: 'resize',
  });

  constructor() {
    effect(() => {
      this.valueChanged.emit({ value: this.value() });
    });
    effect(() => {
      const sv = this.startingValue();
      if (sv !== undefined) this.#updateValue(sv);
    });
  }

  #updateValue(value: string) {
    this.value.set(value.toString());
  }

  onValueChangeEvent(event: Event) {
    const el = event.target as HTMLInputElement;
    this.#updateValue(el.value);
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
