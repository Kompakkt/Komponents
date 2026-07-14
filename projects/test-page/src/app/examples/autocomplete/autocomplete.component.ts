import { Component, signal } from '@angular/core';
import { AutocompleteComponent, InputComponent, MenuOptionComponent } from '@kompakkt/komponents';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs';
import { countryList } from '../../country-list';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'example-autocomplete',
  standalone: true,
  imports: [InputComponent, AutocompleteComponent, AsyncPipe, MenuOptionComponent],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class ExampleAutocompleteComponent {
  searchCountry = signal('');
  filteredCountries = toObservable(this.searchCountry).pipe(
    startWith(''),
    map(v => v.toLowerCase()),
    map(v => countryList.filter(country => country.toLowerCase().includes(v))),
  );
}
