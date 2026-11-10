import { Component, input, model, output } from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';

@Component({
  selector: 'k-labelled-checkbox',
  imports: [],
  templateUrl: './labelled-checkbox.component.html',
  styleUrl: './labelled-checkbox.component.scss',
})
export class LabelledCheckboxComponent implements FormCheckboxControl {
  label = input.required<string>();
  disabled = input(false);
  checked = model(false);

  readonly = input(false);
  invalid = input(false);
  touched = input(false);
  touch = output<void>();
}
