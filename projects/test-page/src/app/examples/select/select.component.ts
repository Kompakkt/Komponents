import { Component } from '@angular/core';
import { SelectComponent, MenuOptionComponent } from '@kompakkt/komponents';

@Component({
  selector: 'example-select',
  standalone: true,
  imports: [SelectComponent, MenuOptionComponent],
  templateUrl: './select.component.html',
  styles: `
    :host {
      max-width: 200px;
      display: block;
    }
    .flex-row {
      display: flex;
      align-items: center;
      gap: 8px;
      max-width: none;
      margin-top: 16px;
    }
    .flex-row button {
      flex-shrink: 0;
      padding: 5px 12px;
    }
  `,
})
export class ExampleSelectComponent {}
