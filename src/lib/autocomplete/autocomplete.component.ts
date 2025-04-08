import { Component, computed, input } from "@angular/core";
import { InputComponent } from "../input/input.component";

@Component({
  selector: "k-autocomplete",
  standalone: true,
  imports: [],
  templateUrl: "./autocomplete.component.html",
  styleUrl: "./autocomplete.component.scss",
})
export class AutocompleteComponent {
  inputElement = input.required<InputComponent>();
  opened = computed(() => {
    const input = this.inputElement();
    return input.focused();
  });
}
