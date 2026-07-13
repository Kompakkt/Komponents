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
    }
  `,
})
export class ExampleSelectComponent {}
