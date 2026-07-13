import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { WizardComponent } from './wizard.component';
import { WizardStepComponent } from '../wizard-step/wizard-step.component';

@Component({
  standalone: true,
  imports: [WizardComponent, WizardStepComponent],
  template: `
    <k-wizard>
      <k-wizard-step label="Step 1">Content 1</k-wizard-step>
      <k-wizard-step label="Step 2">Content 2</k-wizard-step>
    </k-wizard>
  `,
})
class TestHostComponent {}

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
});
