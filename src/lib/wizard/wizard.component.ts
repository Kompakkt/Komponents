import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  computed,
  contentChildren,
  input,
  signal,
  viewChild,
} from "@angular/core";
import { WizardStepComponent } from "../wizard-step/wizard-step.component";

@Component({
  selector: "k-wizard",
  imports: [],
  standalone: true,
  templateUrl: "./wizard.component.html",
  styleUrl: "./wizard.component.scss",
})
export class WizardComponent implements AfterViewInit {
  horizontalContentContainer = viewChild<ElementRef<HTMLDivElement>>(
    "horizontalContentContainer",
  );

  direction = input<"horizontal" | "vertical">("horizontal");
  linear = input<boolean>(false);

  steps = contentChildren(WizardStepComponent);
  #stepIndex = signal(0);
  stepIndex = computed(() => {
    const index = this.#stepIndex();
    return this.steps().length % index;
  });
  selectedStep = computed(() => {
    const index = this.#stepIndex();
    const length = this.steps().length;
    return this.steps().at(index % length)!;
  });

  @HostBinding("class.horizontal") get isHorizontal() {
    return this.direction() === "horizontal";
  }

  @HostBinding("style.--step-count") get stepCount() {
    return this.steps().length;
  }

  #setSelectedStep(nextStep: WizardStepComponent) {
    const steps = this.steps();
    for (const step of steps) {
      step.active.set(false);
      step.direction.set(this.direction());
    }
    const nextStepIndex = steps.findIndex(
      (step) => step.label() === nextStep.label(),
    );

    nextStep.active.set(true);
    const el = this.horizontalContentContainer();
    if (el) {
      console.log(el.nativeElement, nextStep.contentDiv());
      el.nativeElement.innerHTML =
        nextStep.contentDiv()?.nativeElement.innerHTML ?? "";
    }

    this.#stepIndex.set(nextStepIndex);
  }

  #updateStepCounters() {
    const steps = this.steps();
    for (let i = 0; i < steps.length; i++) {
      steps[i].counter.set(i + 1);
    }
  }

  #setupListeners() {
    const steps = this.steps();
    for (let i = 0; i < steps.length; i++) {
      steps[i].headerClicked.subscribe(() => {
        // console.log('Header clicked', i, steps[i], steps[i].label());
        if (!this.linear()) {
          this.#setSelectedStep(steps[i]);
        }
      });
    }
  }

  nextStep() {
    if (this.#stepIndex() < this.steps().length - 1) {
      this.#stepIndex.update((step) => step + 1);
      this.#setSelectedStep(this.selectedStep());
    }
  }
  prevStep() {
    if (this.#stepIndex() > 0) {
      this.#stepIndex.update((step) => step - 1);
      this.#setSelectedStep(this.selectedStep());
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.#updateStepCounters();
      this.#setupListeners();
      this.#setSelectedStep(this.selectedStep());
    }, 0);
  }
}
