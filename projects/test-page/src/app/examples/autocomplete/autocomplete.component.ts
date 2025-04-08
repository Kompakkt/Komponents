import { Component } from "@angular/core";
import {
  AutocompleteComponent,
  InputComponent,
  MenuOptionComponent,
} from "komponents";
import { FormControl } from "@angular/forms";
import { map, startWith } from "rxjs";
import { countryList } from "../../country-list";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "example-autocomplete",
  standalone: true,
  imports: [
    InputComponent,
    AutocompleteComponent,
    AsyncPipe,
    MenuOptionComponent,
  ],
  templateUrl: "./autocomplete.component.html",
  styleUrl: "./autocomplete.component.scss",
})
export class ExampleAutocompleteComponent {
  searchCountry = new FormControl<string>("", { nonNullable: true });
  filteredCountries = this.searchCountry.valueChanges.pipe(
    startWith(""),
    map((v) => v.toLowerCase()),
    map((v) =>
      countryList.filter((country) => country.toLowerCase().includes(v)),
    ),
  );
}
