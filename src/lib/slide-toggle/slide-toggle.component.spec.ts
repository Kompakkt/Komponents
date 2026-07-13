import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlideToggleComponent } from './slide-toggle.component';

describe('SlideToggleComponent', () => {
  let fixture: ComponentFixture<SlideToggleComponent>;
  let component: SlideToggleComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(SlideToggleComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Toggle me');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display the label', () => {
    const labelEl = fixture.nativeElement.querySelector('.slide-toggle-label');
    expect(labelEl.textContent).toBe('Toggle me');
  });

  it('should start unchecked', () => {
    expect(component.checked()).toBe(false);
    expect(fixture.nativeElement.classList.contains('active')).toBe(false);
  });

  it('should toggle checked state on click', () => {
    const toggle = fixture.nativeElement.querySelector('.slide-toggle');
    toggle.click();
    fixture.detectChanges();
    expect(component.checked()).toBe(true);
    expect(fixture.nativeElement.classList.contains('active')).toBe(true);
  });

  it('should emit checkedChange on toggle', () => {
    const values: boolean[] = [];
    component.checkedChange.subscribe(v => values.push(v));
    const toggle = fixture.nativeElement.querySelector('.slide-toggle');
    toggle.click();
    expect(values).toEqual([true]);
    toggle.click();
    expect(values).toEqual([true, false]);
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
    const f = TestBed.createComponent(SlideToggleComponent);
    f.componentRef.setInput('label', 'Test');
    const values: boolean[] = [];
    f.componentInstance.checkedChange.subscribe(v => values.push(v));
    f.detectChanges();
    expect(values).toEqual([]);
  });

  it('should emit exactly once per toggle call', () => {
    const values: boolean[] = [];
    component.checkedChange.subscribe(v => values.push(v));
    component.toggle();
    component.toggle();
    component.toggle();
    expect(values).toEqual([true, false, true]);
  });

  it('should reflect startingValue', async () => {
    fixture = TestBed.createComponent(SlideToggleComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Pre-checked');
    fixture.componentRef.setInput('startingValue', true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.checked()).toBe(true);
  });
});
