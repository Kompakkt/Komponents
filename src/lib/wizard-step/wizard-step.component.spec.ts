import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WizardStepComponent } from './wizard-step.component';

describe('WizardStepComponent', () => {
  let fixture: ComponentFixture<WizardStepComponent>;
  let component: WizardStepComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(WizardStepComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Step 1');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display the label', () => {
    const labelEl = fixture.nativeElement.querySelector('.wizard-step-label span');
    expect(labelEl.textContent).toBe('Step 1');
  });

  it('should display the counter', () => {
    component.counter.set(1);
    fixture.detectChanges();
    const counterEl = fixture.nativeElement.querySelector('.wizard-step-counter');
    expect(counterEl.textContent?.trim()).toBe('1');
  });

  it('should not be active by default', () => {
    expect(component.active()).toBe(false);
    expect(fixture.nativeElement.classList.contains('step-active')).toBe(false);
  });

  it('should have active class when active signal is true', () => {
    component.active.set(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('step-active')).toBe(true);
  });

  it('should emit headerClicked when label is clicked', () => {
    let emitted = false;
    component.headerClicked.subscribe(() => (emitted = true));
    const labelEl = fixture.nativeElement.querySelector('.wizard-step-label');
    labelEl.click();
    expect(emitted).toBe(true);
  });

  it('should have horizontal class by default', () => {
    expect(fixture.nativeElement.classList.contains('horizontal')).toBe(true);
  });

  it('should have completed class when completed signal is true', () => {
    component.completed.set(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('step-completed')).toBe(true);
  });
});
