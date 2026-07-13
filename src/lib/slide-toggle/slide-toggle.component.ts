import { Component, HostBinding, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'k-slide-toggle',
  standalone: true,
  imports: [],
  templateUrl: './slide-toggle.component.html',
  styleUrl: './slide-toggle.component.scss',
})
export class SlideToggleComponent {
  label = input.required<string>();
  startingValue = input<boolean>(false);
  checkedChange = output<boolean>();
  checked = signal(false);
  #sync = effect(() => this.checked.set(this.startingValue()));

  toggle() {
    const next = !this.checked();
    this.checked.set(next);
    this.checkedChange.emit(next);
  }

  @HostBinding('class.active')
  get active() {
    return this.checked();
  }
}
