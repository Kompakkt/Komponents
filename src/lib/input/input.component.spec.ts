import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let fixture: ComponentFixture<InputComponent>;
  let component: InputComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Name');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display the label', () => {
    const labelEl = fixture.nativeElement.querySelector('.label');
    expect(labelEl.textContent).toBe('Name');
  });

  it('should render an input element', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
  });

  it('should set input type from input', async () => {
    fixture.componentRef.setInput('type', 'password');
    fixture.detectChanges();
    await fixture.whenStable();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('type')).toBe('password');
  });

  it('should update value on input event', () => {
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    expect(component.value()).toBe('hello');
  });

  it('should emit valueChanged on value change', async () => {
    const values: Array<{ value: string; valueAsNumber: number }> = [];
    component.valueChanged.subscribe(v => values.push(v));
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(values.length).toBe(1);
    expect(values[0].value).toBe('test');
  });

  it('should handle floatingLabel="" attribute via booleanAttribute', async () => {
    fixture.componentRef.setInput('floatingLabel', '');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.classList.contains('floating-label')).toBe(true);
  });

  it('should set floating label class when floatingLabel is true', async () => {
    fixture.componentRef.setInput('floatingLabel', true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.classList.contains('floating-label')).toBe(true);
  });

  it('should emit correct values on sequential changes', async () => {
    const values: Array<{ value: string; valueAsNumber: number }> = [];
    component.valueChanged.subscribe(v => values.push(v));
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'first';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    input.value = 'second';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(values.length).toBe(2);
    expect(values[0].value).toBe('first');
    expect(values[1].value).toBe('second');
  });

  it('should reflect startingValue', async () => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Prefilled');
    fixture.componentRef.setInput('startingValue', 'pre');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.value()).toBe('pre');
  });

  it('should react to late startingValue changes', async () => {
    fixture.componentRef.setInput('startingValue', 'first');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.componentRef.setInput('startingValue', 'second');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.value()).toBe('second');
  });

  it('should not emit valueChanged during initialization', () => {
    const f = TestBed.createComponent(InputComponent);
    f.componentRef.setInput('label', 'Test');
    const values: Array<{ value: string; valueAsNumber: number }> = [];
    f.componentInstance.valueChanged.subscribe(v => values.push(v));
    f.detectChanges();
    expect(values).toEqual([]);
  });

  it('should display prefix and suffix', async () => {
    fixture.componentRef.setInput('prefix', '$');
    fixture.componentRef.setInput('suffix', '.00');
    fixture.detectChanges();
    await fixture.whenStable();
    const prefixEl = fixture.nativeElement.querySelector('.prefix');
    const suffixEl = fixture.nativeElement.querySelector('.suffix');
    expect(prefixEl.textContent).toContain('$');
    expect(suffixEl.textContent).toContain('.00');
  });
});
