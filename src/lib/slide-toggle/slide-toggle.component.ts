import { booleanAttribute, Component, HostBinding, input, model, output } from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';

@Component({
  selector: 'k-slide-toggle',
  imports: [],
  templateUrl: './slide-toggle.component.html',
  styleUrl: './slide-toggle.component.scss',
})
export class SlideToggleComponent implements FormCheckboxControl {
  label = input.required<string>();
  checked = model(false);

  disabled = input(false, { transform: booleanAttribute });
  readonly = input(false, { transform: booleanAttribute });
  invalid = input(false);
  touched = input(false);
  touch = output<void>();

  toggle() {
    if (this.disabled() || this.readonly()) return;
    this.checked.set(!this.checked());
    this.touch.emit();
  }

  @HostBinding('class.active')
  get active() {
    return this.checked();
  }

  @HostBinding('class.disabled')
  get isDisabled() {
    return this.disabled();
  }
}
