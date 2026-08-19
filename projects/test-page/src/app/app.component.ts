import { Component } from '@angular/core';
import { ExampleMenuComponent } from './examples/menu/menu.component';
import ExampleMenuComponentTemplate from './examples/menu/menu.component.html';
import { ExampleButtonsComponent } from './examples/buttons/buttons.component';
import ExampleButtonsComponentTemplate from './examples/buttons/buttons.component.html';
import { ExampleDetailsComponent } from './examples/details/details.component';
import ExampleDetailsComponentTemplate from './examples/details/details.component.html';
import { ExampleTooltipComponent } from './examples/tooltip/tooltip.component';
import ExampleTooltipComponentTemplate from './examples/tooltip/tooltip.component.html';
import { ExampleAutocompleteComponent } from './examples/autocomplete/autocomplete.component';
import ExampleAutocompleteComponentTemplate from './examples/autocomplete/autocomplete.component.html';
import { ExampleInputElementsComponent } from './examples/input-elements/input-elements.component';
import ExampleInputElementsComponentTemplate from './examples/input-elements/input-elements.component.html';
import { ExampleWizardComponent } from './examples/wizard/wizard.component';
import ExampleWizardComponentTemplate from './examples/wizard/wizard.component.html';
import { ExampleSelectComponent } from './examples/select/select.component';
import ExampleSelectComponentTemplate from './examples/select/select.component.html';
import { ExampleExternalStateComponent } from './examples/external-state/external-state.component';
import ExampleExternalStateComponentTemplate from './examples/external-state/external-state.component.html';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ExampleMenuComponent,
    ExampleButtonsComponent,
    ExampleDetailsComponent,
    ExampleTooltipComponent,
    ExampleAutocompleteComponent,
    ExampleInputElementsComponent,
    ExampleWizardComponent,
    ExampleSelectComponent,
    ExampleExternalStateComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  examples = {
    menu: ExampleMenuComponentTemplate,
    buttons: ExampleButtonsComponentTemplate,
    details: ExampleDetailsComponentTemplate,
    tooltip: ExampleTooltipComponentTemplate,
    autocomplete: ExampleAutocompleteComponentTemplate,
    inputElements: ExampleInputElementsComponentTemplate,
    wizard: ExampleWizardComponentTemplate,
    select: ExampleSelectComponentTemplate,
    externalState: ExampleExternalStateComponentTemplate,
  };
}
