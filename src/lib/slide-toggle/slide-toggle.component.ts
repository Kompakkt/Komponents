import { Component, HostBinding, input, model } from '@angular/core';

@Component({
  selector: 'k-slide-toggle',
  standalone: true,
  imports: [],
  templateUrl: './slide-toggle.component.html',
  styleUrl: './slide-toggle.component.scss',
})
export class SlideToggleComponent {
  label = input.required<string>();
  checked = model(false);

  toggle() {
    this.checked.set(!this.checked());
  }

  @HostBinding('class.active')
  get active() {
    return this.checked();
  }
}
