import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabelledCheckboxComponent } from './labelled-checkbox.component';

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

  it('should emit checkedChange on toggle', async () => {
    const values: boolean[] = [];
    component.checkedChange.subscribe(v => values.push(v));
    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(values).toEqual([true]);
  });

  it('should react to late startingValue changes', async () => {
    fixture.componentRef.setInput('startingValue', true);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.componentRef.setInput('startingValue', false);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.checked()).toBe(false);
  });

  it('should not emit checkedChange during initialization', () => {
    const f = TestBed.createComponent(LabelledCheckboxComponent);
    f.componentRef.setInput('label', 'Test');
    const values: boolean[] = [];
    f.componentInstance.checkedChange.subscribe(v => values.push(v));
    f.detectChanges();
    expect(values).toEqual([]);
  });

  it('should emit correct values on sequential toggles', async () => {
    const values: boolean[] = [];
    component.checkedChange.subscribe(v => values.push(v));
    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    await fixture.whenStable();
    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(values).toEqual([true, false]);
  });

  it('should reflect startingValue', async () => {
    fixture = TestBed.createComponent(LabelledCheckboxComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Pre-checked');
    fixture.componentRef.setInput('startingValue', true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.checked()).toBe(true);
  });
});
