import { Component, ElementRef, HostBinding, input, model, viewChild } from '@angular/core';

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

  value = model('');

  prefix = input('');
  suffix = input('');

  minRows = input<number | string>(4, { alias: 'min-rows' });
  maxRows = input<number | string>(24, { alias: 'max-rows' });
  resize = input<'none' | 'both' | 'horizontal' | 'vertical'>('vertical', {
    alias: 'resize',
  });

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
