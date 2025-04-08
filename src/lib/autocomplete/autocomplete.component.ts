import { Component, HostBinding, computed, input } from "@angular/core";
import { InputComponent } from "../input/input.component";

@Component({
  selector: "k-autocomplete",
  standalone: true,
  imports: [],
  templateUrl: "./autocomplete.component.html",
  styleUrl: "./autocomplete.component.scss",
})
export class AutocompleteComponent {
  maxHeight = input<string | number>(240, { alias: "max-height" });

  @HostBinding("style.--max-height")
  get maxHeightStyle() {
    return `${this.maxHeight()}px`;
  }

  inputElement = input.required<InputComponent>();
  opened = computed(() => {
    const input = this.inputElement();
    return input.focused();
  });
}
