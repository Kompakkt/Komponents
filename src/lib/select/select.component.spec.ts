import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';
import { MenuOptionComponent } from '../menu-option/menu-option.component';

describe('SelectComponent', () => {
  let fixture: ComponentFixture<SelectComponent>;
  let component: SelectComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display placeholder by default', () => {
    const triggerText = fixture.nativeElement.querySelector('.trigger-text');
    expect(triggerText.textContent).toBe('Select...');
  });

  it('should display custom placeholder', async () => {
    fixture.componentRef.setInput('placeholder', 'Choose...');
    fixture.detectChanges();
    await fixture.whenStable();
    const triggerText = fixture.nativeElement.querySelector('.trigger-text');
    expect(triggerText.textContent).toBe('Choose...');
  });

  it('should display label when provided', async () => {
    fixture.componentRef.setInput('label', 'Country');
    fixture.detectChanges();
    await fixture.whenStable();
    const labelEl = fixture.nativeElement.querySelector('.label');
    expect(labelEl?.textContent).toBe('Country');
  });

  it('should render a trigger button', () => {
    const trigger = fixture.nativeElement.querySelector('.trigger');
    expect(trigger).toBeTruthy();
  });

  it('should render a dropdown element', () => {
    const dropdown = fixture.nativeElement.querySelector('.dropdown');
    expect(dropdown).toBeTruthy();
  });

  it('should start closed', () => {
    expect(component.open()).toBe(false);
  });

  it('should not emit valueChanged during initialization', () => {
    const f = TestBed.createComponent(SelectComponent);
    const values: string[] = [];
    f.componentInstance.valueChanged.subscribe(v => values.push(v));
    f.detectChanges();
    expect(values).toEqual([]);
  });

  it('should handle disabled="" attribute via booleanAttribute', async () => {
    fixture.componentRef.setInput('disabled', '');
    fixture.detectChanges();
    await fixture.whenStable();
    const trigger = fixture.nativeElement.querySelector('.trigger');
    expect(trigger.disabled).toBe(true);
  });

  it('should disable the trigger button when disabled', async () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    await fixture.whenStable();
    const trigger = fixture.nativeElement.querySelector('.trigger');
    expect(trigger.disabled).toBe(true);
  });
});
