import { Component } from "@angular/core";
import {
  InputComponent,
  LabelledCheckboxComponent,
  SlideToggleComponent,
  SliderComponent,
  TextareaComponent,
} from "komponents";

@Component({
  selector: "example-input-elements",
  standalone: true,
  imports: [
    InputComponent,
    TextareaComponent,
    SliderComponent,
    SlideToggleComponent,
    LabelledCheckboxComponent,
  ],
  templateUrl: "./input-elements.component.html",
  styleUrl: "./input-elements.component.scss",
})
export class ExampleInputElementsComponent {}
