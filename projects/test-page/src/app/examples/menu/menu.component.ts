import { Component } from '@angular/core';
import {
  ButtonComponent,
  ButtonRowComponent,
  MenuComponent,
  MenuOptionComponent,
} from '@kompakkt/komponents';

@Component({
  selector: 'example-menu',
  imports: [ButtonComponent, ButtonRowComponent, MenuComponent, MenuOptionComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class ExampleMenuComponent {}
