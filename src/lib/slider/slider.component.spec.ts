import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let fixture: ComponentFixture<SliderComponent>;
  let component: SliderComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Volume');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display the label', () => {
    const labelEl = fixture.nativeElement.querySelector('.label');
    expect(labelEl.textContent).toBe('Volume');
  });

  it('should hide label when showLabel is false', async () => {
    fixture.componentRef.setInput('showLabel', false);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.label')).toBeNull();
  });

  it('should render rail and handle elements', () => {
    expect(fixture.nativeElement.querySelector('.slider-rail')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.slider-handle')).toBeTruthy();
  });

  it('should show min and max info values', () => {
    const infoValues = fixture.nativeElement.querySelectorAll('.info-value');
    expect(infoValues.length).toBe(2);
    expect(infoValues[0].textContent).toBe('0');
    expect(infoValues[1].textContent).toBe('100');
  });

  it('should start with value 0', () => {
    expect(component.value()).toBe(0);
  });

  it('should have left-to-right direction by default', () => {
    expect(component.direction()).toBe('left-to-right');
    expect(fixture.nativeElement.classList.contains('left-to-right')).toBe(true);
  });

  it('should set handle position based on value', () => {
    expect(component.handlePosition()).toBe(0);
  });

  it('should emit valueChanged on value change', () => {
    const values: number[] = [];
    component.valueChanged.subscribe(v => values.push(v));
    component.value.set(25);
    fixture.detectChanges();
    component.value.set(50);
    fixture.detectChanges();
    expect(values).toEqual([50]);
  });

  it('should react to late startingValue changes', async () => {
    fixture.componentRef.setInput('startingValue', 25);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.componentRef.setInput('startingValue', 75);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.value()).toBe(75);
  });

  it('should not emit valueChanged during initialization', () => {
    const f = TestBed.createComponent(SliderComponent);
    f.componentRef.setInput('label', 'Test');
    const values: number[] = [];
    f.componentInstance.valueChanged.subscribe(v => values.push(v));
    f.detectChanges();
    expect(values).toEqual([]);
  });

  it('should reflect startingValue', async () => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Volume');
    fixture.componentRef.setInput('startingValue', 75);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.value()).toBe(75);
  });
});
