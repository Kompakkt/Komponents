import { Component, ElementRef, HostBinding, inject, input } from '@angular/core';

@Component({
  selector: 'k-menu-option',
  standalone: true,
  imports: [],
  templateUrl: './menu-option.component.html',
  styleUrl: './menu-option.component.scss',
})
export class MenuOptionComponent {
  disabled = input<string | undefined>();
  value = input<string>();
  selected = false;

  elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  @HostBinding('class.disabled') get disabledClass() {
    return this.isDisabled;
  }

  get isDisabled() {
    return typeof this.disabled() === 'string';
  }

  @HostBinding('class.selected') get selectedClass() {
    return this.selected;
  }

  @HostBinding('attr.title') get titleText() {
    return this.elementRef.nativeElement.textContent?.trim() || null;
  }
}
