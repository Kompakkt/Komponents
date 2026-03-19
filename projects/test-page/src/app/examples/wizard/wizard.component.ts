import { Component } from "@angular/core";
import { WizardComponent, WizardStepComponent } from "@kompakkt/komponents";

@Component({
  selector: "example-wizard",
  standalone: true,
  imports: [WizardStepComponent, WizardComponent],
  templateUrl: "./wizard.component.html",
  styleUrl: "./wizard.component.scss",
})
export class ExampleWizardComponent {}
