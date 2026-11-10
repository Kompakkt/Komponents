import { Component, computed, signal } from '@angular/core';
import { AutocompleteComponent, InputComponent, MenuOptionComponent } from '@kompakkt/komponents';
import { countryList } from '../../country-list';

@Component({
  selector: 'example-autocomplete',
  imports: [InputComponent, AutocompleteComponent, MenuOptionComponent],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class ExampleAutocompleteComponent {
  searchCountry = signal('');
  filteredCountries = computed(() => {
    const country = this.searchCountry().trim().toLowerCase();
    return countryList.filter(c => c.toLowerCase().includes(country));
  });
}
