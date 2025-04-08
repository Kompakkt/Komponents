import { Component } from "@angular/core";
import {
  ButtonComponent,
  ButtonRowComponent,
  MenuComponent,
  MenuOptionComponent,
} from "komponents";

@Component({
  selector: "example-menu",
  standalone: true,
  imports: [
    ButtonComponent,
    ButtonRowComponent,
    MenuComponent,
    MenuOptionComponent,
  ],
  templateUrl: "./menu.component.html",
  styleUrl: "./menu.component.scss",
})
export class ExampleMenuComponent {}
