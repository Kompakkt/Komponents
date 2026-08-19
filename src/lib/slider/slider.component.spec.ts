import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { SliderComponent } from './slider.component';

@Component({
  standalone: true,
  imports: [SliderComponent],
  template: `<k-slider [label]="label" [(value)]="value" />`,
})
class SliderHostComponent {
  label = 'Volume';
  value = 0;
}

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

  it('should reflect an initially bound value', async () => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Volume');
    fixture.componentRef.setInput('value', 75);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.value()).toBe(75);
  });

  it('should react to late external value changes', async () => {
    fixture.componentRef.setInput('value', 25);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.componentRef.setInput('value', 75);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.value()).toBe(75);
  });
});

describe('SliderComponent with host bindings', () => {
  it('should not emit valueChange during initialization', async () => {
    const emitted: number[] = [];
    @Component({
      standalone: true,
      imports: [SliderComponent],
      template: `<k-slider [label]="'Test'" (valueChange)="emitted.push($event)" />`,
    })
    class EmitHostComponent {
      emitted = emitted;
    }
    const f = TestBed.createComponent(EmitHostComponent);
    f.detectChanges();
    await f.whenStable();
    expect(emitted).toEqual([]);
  });

  it('should update the two-way bound host field on rail click', async () => {
    const fixture = TestBed.createComponent(SliderHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const rail = fixture.nativeElement.querySelector('.slider-rail');
    const handle = fixture.nativeElement.querySelector('.slider-handle');
    vi.spyOn(rail, 'getBoundingClientRect').mockImplementation(() => ({
      left: 0,
      right: 200,
      top: 0,
      bottom: 20,
      width: 200,
      height: 20,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));
    vi.spyOn(handle, 'getBoundingClientRect').mockImplementation(() => ({
      left: 0,
      right: 20,
      top: 0,
      bottom: 20,
      width: 20,
      height: 20,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));

    rail.dispatchEvent(new MouseEvent('click', { clientX: 100, clientY: 10 }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.value).toBeCloseTo(50, 1);
  });

  it('should reflect late external value changes in one-way binding', async () => {
    @Component({
      standalone: true,
      imports: [SliderComponent],
      template: `<k-slider [label]="'Test'" [value]="value()" />`,
    })
    class OneWayHostComponent {
      value = signal(0);
    }
    const f = TestBed.createComponent(OneWayHostComponent);
    f.detectChanges();
    await f.whenStable();

    f.componentInstance.value.set(75);
    f.detectChanges();
    await f.whenStable();
    expect(f.nativeElement.querySelector('.slider-value-tooltip').textContent).toBe('75');
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

  function createSlider(
    overrides: {
      min?: number;
      max?: number;
      step?: number;
      direction?: 'left-to-right' | 'bottom-to-top';
    } = {},
  ) {
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

    const emitted: number[] = [];
    @Component({
      standalone: true,
      imports: [SliderComponent],
      template: `<k-slider [label]="'Vol'" (valueChange)="emitted.push($event)" />`,
    })
    class EmitHostComponent {
      emitted = emitted;
    }
    const ef = TestBed.createComponent(EmitHostComponent);
    ef.detectChanges();
    await ef.whenStable();
    const eRail = ef.nativeElement.querySelector('.slider-rail');
    const eHandle = ef.nativeElement.querySelector('.slider-handle');
    mockRect(eRail, { x: 0, y: 0, w: 200, h: 20 });
    mockRect(eHandle, { x: 0, y: 0, w: 20, h: 20 });

    eRail.dispatchEvent(new MouseEvent('click', { clientX: 100, clientY: 10 }));
    ef.detectChanges();
    // clickPosition = 100 - 0 - 10 = 90; available = 200 - 20 = 180; value = 90/180*100 = 50
    expect(ef.componentInstance.emitted).toEqual([50]);
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
