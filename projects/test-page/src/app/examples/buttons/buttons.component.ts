import { Component } from "@angular/core";
import { ButtonComponent, ButtonRowComponent } from "komponents";

@Component({
  selector: "example-buttons",
  standalone: true,
  imports: [ButtonComponent, ButtonRowComponent],
  templateUrl: "./buttons.component.html",
  styleUrl: "./buttons.component.scss",
})
export class ExampleButtonsComponent {}
