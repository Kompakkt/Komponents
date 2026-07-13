import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
  let fixture: ComponentFixture<TextareaComponent>;
  let component: TextareaComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Description');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display the label', () => {
    const labelEl = fixture.nativeElement.querySelector('.label');
    expect(labelEl.textContent).toBe('Description');
  });

  it('should render a textarea element', () => {
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea).toBeTruthy();
  });

  it('should set min-rows and max-rows styles', () => {
    expect(fixture.nativeElement.style.getPropertyValue('--min-rows')).toBe('4');
    expect(fixture.nativeElement.style.getPropertyValue('--max-rows')).toBe('24');
  });

  it('should update value on input event', () => {
    const textarea = fixture.nativeElement.querySelector('textarea');
    textarea.value = 'new text';
    textarea.dispatchEvent(new Event('input'));
    expect(component.value()).toBe('new text');
  });

  it('should emit valueChanged on value change', () => {
    const values: Array<{ value: string }> = [];
    component.valueChanged.subscribe(v => values.push(v));
    component.value.set('init');
    fixture.detectChanges();
    component.value.set('next');
    fixture.detectChanges();
    expect(values).toEqual([{ value: 'next' }]);
  });

  it('should reflect startingValue', async () => {
    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Prefilled');
    fixture.componentRef.setInput('startingValue', 'initial');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.value()).toBe('initial');
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
    const f = TestBed.createComponent(TextareaComponent);
    f.componentRef.setInput('label', 'Test');
    const values: Array<{ value: string }> = [];
    f.componentInstance.valueChanged.subscribe(v => values.push(v));
    f.detectChanges();
    expect(values).toEqual([]);
  });

  it('should set resize style', async () => {
    fixture.componentRef.setInput('resize', 'none');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.style.getPropertyValue('--resize')).toBe('none');
  });
});
