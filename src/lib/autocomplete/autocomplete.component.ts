import { Component, computed, input } from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'k-autocomplete',
  standalone: true,
  imports: [],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  host: {
    'style.--max-height': 'maxHeightStyle()',
  },
})
export class AutocompleteComponent {
  maxHeight = input<string | number>(240, { alias: 'max-height' });
  maxHeightStyle = computed(() => {
    const v = this.maxHeight();
    return typeof v === 'number' ? `${v}px` : v;
  });

  inputElement = input.required<InputComponent>();
  opened = computed(() => {
    const input = this.inputElement();
    return input.focused();
  });
}
