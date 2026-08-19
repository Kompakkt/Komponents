import { Component, input, model } from '@angular/core';

@Component({
  selector: 'k-labelled-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './labelled-checkbox.component.html',
  styleUrl: './labelled-checkbox.component.scss',
})
export class LabelledCheckboxComponent {
  label = input.required<string>();
  checked = model(false);
}
