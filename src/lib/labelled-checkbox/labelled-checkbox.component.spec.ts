import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabelledCheckboxComponent } from './labelled-checkbox.component';

@Component({
  standalone: true,
  imports: [LabelledCheckboxComponent],
  template: `<k-labelled-checkbox [label]="label" [(checked)]="checked" />`,
})
class CheckboxHostComponent {
  label = 'Check me';
  checked = false;
}

describe('LabelledCheckboxComponent', () => {
  let fixture: ComponentFixture<LabelledCheckboxComponent>;
  let component: LabelledCheckboxComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(LabelledCheckboxComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Check me');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display the label', () => {
    const span = fixture.nativeElement.querySelector('label span');
    expect(span.textContent).toBe('Check me');
  });

  it('should toggle checked state on checkbox change', () => {
    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
    expect(component.checked()).toBe(false);
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    expect(component.checked()).toBe(true);
  });

  it('should reflect an initially bound checked value', async () => {
    fixture = TestBed.createComponent(LabelledCheckboxComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Pre-checked');
    fixture.componentRef.setInput('checked', true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.checked()).toBe(true);
  });

  it('should react to late external checked changes', async () => {
    fixture.componentRef.setInput('checked', true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.checked()).toBe(true);
    fixture.componentRef.setInput('checked', false);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.checked()).toBe(false);
  });
});

describe('LabelledCheckboxComponent with host bindings', () => {
  let fixture: ComponentFixture<CheckboxHostComponent>;
  let host: CheckboxHostComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(CheckboxHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  function getCheckbox() {
    return fixture.nativeElement.querySelector('input[type="checkbox"]');
  }

  it('should not emit checkedChange during initialization', async () => {
    const emitted: boolean[] = [];
    // Re-create with a spy on the two-way bound field via (checkedChange)
    @Component({
      standalone: true,
      imports: [LabelledCheckboxComponent],
      template: `<k-labelled-checkbox [label]="'Test'" (checkedChange)="emitted.push($event)" />`,
    })
    class EmitHostComponent {
      emitted = emitted;
    }
    const f = TestBed.createComponent(EmitHostComponent);
    f.detectChanges();
    await f.whenStable();
    expect(emitted).toEqual([]);
  });

  it('should emit exactly once per toggle (no revert)', async () => {
    const emitted: boolean[] = [];
    @Component({
      standalone: true,
      imports: [LabelledCheckboxComponent],
      template: `<k-labelled-checkbox [label]="'Test'" (checkedChange)="emitted.push($event)" />`,
    })
    class EmitHostComponent {
      emitted = emitted;
    }
    const f = TestBed.createComponent(EmitHostComponent);
    f.detectChanges();
    await f.whenStable();

    const checkbox = f.nativeElement.querySelector('input[type="checkbox"]');
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    f.detectChanges();
    await f.whenStable();

    expect(emitted).toEqual([true]);
    expect(f.componentInstance.emitted).toEqual([true]);
  });

  it('should emit correct values on sequential toggles', async () => {
    const checkbox = getCheckbox();
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.checked).toBe(true);

    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.checked).toBe(false);
  });

  it('should update the two-way bound host field and stay checked', async () => {
    const checkbox = getCheckbox();
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.checked).toBe(true);
    expect(checkbox.checked).toBe(true);
  });

  it('should reflect late external value changes in one-way binding', async () => {
    @Component({
      standalone: true,
      imports: [LabelledCheckboxComponent],
      template: `<k-labelled-checkbox [label]="'Test'" [checked]="checked()" />`,
    })
    class OneWayHostComponent {
      checked = signal(false);
    }
    const f = TestBed.createComponent(OneWayHostComponent);
    f.detectChanges();
    await f.whenStable();

    f.componentInstance.checked.set(true);
    f.detectChanges();
    await f.whenStable();
    expect(f.nativeElement.querySelector('input[type="checkbox"]').checked).toBe(true);
  });
});
