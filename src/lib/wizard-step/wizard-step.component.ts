import {
  Component,
  ElementRef,
  HostBinding,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'k-wizard-step',
  standalone: true,
  imports: [],
  templateUrl: './wizard-step.component.html',
  styleUrl: './wizard-step.component.scss',
})
export class WizardStepComponent {
  label = input.required<string>();
  active = signal(false);
  completed = signal(false);
  counter = signal(0);

  direction = signal<'horizontal' | 'vertical'>('horizontal');

  contentDiv = viewChild<ElementRef<HTMLDivElement>>('stepContent');

  headerClicked = output<void>();

  @HostBinding('class.step-active')
  get isActiveStep() {
    return this.active();
  }

  @HostBinding('class.step-completed')
  get isCompletedStep() {
    return this.completed();
  }

  @HostBinding('class.horizontal')
  get isHorizontal() {
    return this.direction() === 'horizontal';
  }
}
