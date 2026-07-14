import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'k-labelled-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './labelled-checkbox.component.html',
  styleUrl: './labelled-checkbox.component.scss',
})
export class LabelledCheckboxComponent {
  label = input.required<string>();
  startingValue = input<boolean>(false);
  checkedChange = output<boolean>();
  checked = signal(false);

  constructor() {
    effect(() => {
      this.checkedChange.emit(this.checked());
    });
    effect(() => {
      const sv = this.startingValue();
      if (sv !== this.checked()) this.checked.set(sv);
    });
  }
}
