import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { WizardComponent } from './wizard.component';
import { WizardStepComponent } from '../wizard-step/wizard-step.component';

@Component({
  standalone: true,
  imports: [WizardComponent, WizardStepComponent],
  template: `
    <k-wizard [linear]="linear">
      <k-wizard-step label="Step 1">Content 1</k-wizard-step>
      <k-wizard-step label="Step 2">Content 2</k-wizard-step>
    </k-wizard>
  `,
})
class TestHostComponent {
  linear = false;
}

describe('WizardComponent', () => {
  it('should have horizontal direction by default', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise(r => setTimeout(r, 10));
    const wizard: WizardComponent = fixture.debugElement.query(
      By.directive(WizardComponent),
    ).componentInstance;
    expect(wizard.direction()).toBe('horizontal');
    expect(fixture.nativeElement.querySelector('k-wizard')?.classList.contains('horizontal')).toBe(
      true,
    );
  });

  it('should render steps from a test host', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    // Wait for setTimeout in ngAfterViewInit
    await new Promise(r => setTimeout(r, 10));
    fixture.detectChanges();

    const steps = fixture.nativeElement.querySelectorAll('k-wizard-step');
    expect(steps.length).toBe(2);
    expect(steps[0].textContent).toContain('Step 1');
    expect(steps[1].textContent).toContain('Step 2');
  });

  it('should set step counters', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise(r => setTimeout(r, 10));
    fixture.detectChanges();

    const wizard: WizardComponent = fixture.debugElement.query(
      By.directive(WizardComponent),
    ).componentInstance;
    expect(wizard.steps().length).toBe(2);
    expect(wizard.steps()[0].counter()).toBe(1);
    expect(wizard.steps()[1].counter()).toBe(2);
  });

  it('stepIndex should be 0 initially', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise(r => setTimeout(r, 10));
    fixture.detectChanges();

    const wizard: WizardComponent = fixture.debugElement.query(
      By.directive(WizardComponent),
    ).componentInstance;
    expect(wizard.stepIndex()).toBe(0);
  });

  it('nextStep should advance stepIndex and selectedStep', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise(r => setTimeout(r, 10));
    fixture.detectChanges();

    const wizard: WizardComponent = fixture.debugElement.query(
      By.directive(WizardComponent),
    ).componentInstance;
    const firstStep = wizard.selectedStep();
    wizard.nextStep();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(wizard.stepIndex()).toBe(1);
    expect(wizard.selectedStep().label()).not.toBe(firstStep.label());
  });

  it('prevStep at first step is a no-op', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise(r => setTimeout(r, 10));
    fixture.detectChanges();

    const wizard: WizardComponent = fixture.debugElement.query(
      By.directive(WizardComponent),
    ).componentInstance;
    wizard.prevStep();
    fixture.detectChanges();

    expect(wizard.stepIndex()).toBe(0);
  });

  it('nextStep at last step is a no-op', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise(r => setTimeout(r, 10));
    fixture.detectChanges();

    const wizard: WizardComponent = fixture.debugElement.query(
      By.directive(WizardComponent),
    ).componentInstance;
    wizard.nextStep();
    wizard.nextStep();
    fixture.detectChanges();

    expect(wizard.stepIndex()).toBe(1);
  });

  it('should not log to console when selecting a step', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise(r => setTimeout(r, 10));
    fixture.detectChanges();

    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const wizard: WizardComponent = fixture.debugElement.query(
      By.directive(WizardComponent),
    ).componentInstance;
    wizard.nextStep();
    fixture.detectChanges();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should block header-click navigation when linear is true', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.linear = true;
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise(r => setTimeout(r, 10));
    fixture.detectChanges();

    const wizard: WizardComponent = fixture.debugElement.query(
      By.directive(WizardComponent),
    ).componentInstance;
    const initial = wizard.stepIndex();
    const stepHeaders = fixture.nativeElement.querySelectorAll('.wizard-step-label');
    stepHeaders[1]?.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(wizard.stepIndex()).toBe(initial);
  });

  it('should allow header-click navigation when linear is false', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.linear = false;
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise(r => setTimeout(r, 10));
    fixture.detectChanges();

    const wizard: WizardComponent = fixture.debugElement.query(
      By.directive(WizardComponent),
    ).componentInstance;
    const stepHeaders = fixture.nativeElement.querySelectorAll('.wizard-step-label');
    stepHeaders[1]?.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(wizard.stepIndex()).toBe(1);
  });
});
