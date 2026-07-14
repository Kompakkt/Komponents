import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
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

describe('SliderComponent value math', () => {
  function mockRect(el: HTMLElement, r: { x: number; y: number; w: number; h: number }) {
    vi.spyOn(el, 'getBoundingClientRect').mockImplementation(() => ({
      left: r.x,
      right: r.x + r.w,
      top: r.y,
      bottom: r.y + r.h,
      width: r.w,
      height: r.h,
      x: r.x,
      y: r.y,
      toJSON: () => ({}),
    }));
  }

  function createSlider(overrides: { min?: number; max?: number; step?: number; direction?: 'left-to-right' | 'bottom-to-top' } = {}) {
    const f = TestBed.createComponent(SliderComponent);
    f.componentRef.setInput('label', 'Vol');
    if (overrides.min !== undefined) f.componentRef.setInput('min', overrides.min);
    if (overrides.max !== undefined) f.componentRef.setInput('max', overrides.max);
    if (overrides.step !== undefined) f.componentRef.setInput('step', overrides.step);
    if (overrides.direction) f.componentRef.setInput('direction', overrides.direction);
    f.detectChanges();
    const rail = f.nativeElement.querySelector('.slider-rail');
    const handle = f.nativeElement.querySelector('.slider-handle');
    return { f, rail, handle };
  }

  it('computes value from a horizontal rail click', async () => {
    const { f, rail, handle } = createSlider();
    await f.whenStable();
    mockRect(rail, { x: 0, y: 0, w: 200, h: 20 });
    mockRect(handle, { x: 0, y: 0, w: 20, h: 20 });

    rail.dispatchEvent(new MouseEvent('click', { clientX: 100, clientY: 10 }));
    f.detectChanges();
    // clickPosition = 100 - 0 - 10 = 90; available = 200 - 20 = 180; value = 90/180*100 = 50
    expect(f.componentInstance.value()).toBeCloseTo(50, 1);
  });

  it('clamps to min and max', async () => {
    const { f, rail, handle } = createSlider({ min: 0, max: 100 });
    await f.whenStable();
    mockRect(rail, { x: 0, y: 0, w: 200, h: 20 });
    mockRect(handle, { x: 0, y: 0, w: 20, h: 20 });

    rail.dispatchEvent(new MouseEvent('click', { clientX: -50, clientY: 10 }));
    f.detectChanges();
    expect(f.componentInstance.value()).toBe(0);

    rail.dispatchEvent(new MouseEvent('click', { clientX: 999, clientY: 10 }));
    f.detectChanges();
    expect(f.componentInstance.value()).toBe(100);
  });

  it('snaps to step', async () => {
    const { f, rail, handle } = createSlider({ step: 25 });
    await f.whenStable();
    mockRect(rail, { x: 0, y: 0, w: 200, h: 20 });
    mockRect(handle, { x: 0, y: 0, w: 20, h: 20 });

    rail.dispatchEvent(new MouseEvent('click', { clientX: 91, clientY: 10 }));
    f.detectChanges();
    // raw ≈ 45.28; snapped to nearest 25 = 50
    expect(f.componentInstance.value()).toBe(50);
  });

  it('computes value for vertical (bottom-to-top) direction', async () => {
    const { f, rail, handle } = createSlider({ direction: 'bottom-to-top' });
    await f.whenStable();
    mockRect(rail, { x: 0, y: 0, w: 20, h: 200 });
    mockRect(handle, { x: 0, y: 0, w: 20, h: 20 });

    rail.dispatchEvent(new MouseEvent('click', { clientX: 10, clientY: 100 }));
    f.detectChanges();
    // clickPosition = 200 - 100 - 10 = 90; available = 200 - 20 = 180; value = 50
    expect(f.componentInstance.value()).toBeCloseTo(50, 1);
  });
});
