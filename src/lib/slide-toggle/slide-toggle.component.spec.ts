import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SlideToggleComponent } from './slide-toggle.component';

@Component({
  standalone: true,
  imports: [SlideToggleComponent],
  template: `<k-slide-toggle [label]="label" [(checked)]="checked" />`,
})
class ToggleHostComponent {
  label = 'Toggle me';
  checked = false;
}

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

  it('should reflect an initially bound checked value', async () => {
    fixture = TestBed.createComponent(SlideToggleComponent);
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

describe('SlideToggleComponent with host bindings', () => {
  let fixture: ComponentFixture<ToggleHostComponent>;
  let host: ToggleHostComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ToggleHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  function getToggle() {
    return fixture.nativeElement.querySelector('.slide-toggle');
  }

  it('should not emit checkedChange during initialization', async () => {
    const emitted: boolean[] = [];
    @Component({
      standalone: true,
      imports: [SlideToggleComponent],
      template: `<k-slide-toggle [label]="'Test'" (checkedChange)="emitted.push($event)" />`,
    })
    class EmitHostComponent {
      emitted = emitted;
    }
    const f = TestBed.createComponent(EmitHostComponent);
    f.detectChanges();
    await f.whenStable();
    expect(emitted).toEqual([]);
  });

  it('should emit exactly once per toggle call', () => {
    const emitted: boolean[] = [];
    @Component({
      standalone: true,
      imports: [SlideToggleComponent],
      template: `<k-slide-toggle [label]="'Test'" (checkedChange)="emitted.push($event)" />`,
    })
    class EmitHostComponent {
      emitted = emitted;
    }
    const f = TestBed.createComponent(EmitHostComponent);
    f.detectChanges();

    f.componentInstance.emitted.length = 0;
    const comp = f.debugElement.query(By.directive(SlideToggleComponent))
      .componentInstance as SlideToggleComponent;
    comp.toggle();
    comp.toggle();
    comp.toggle();
    expect(f.componentInstance.emitted).toEqual([true, false, true]);
  });

  it('should emit checkedChange on click and update the bound host field', () => {
    getToggle().click();
    fixture.detectChanges();
    expect(host.checked).toBe(true);
    getToggle().click();
    fixture.detectChanges();
    expect(host.checked).toBe(false);
  });

  it('should reflect late external value changes in one-way binding', async () => {
    @Component({
      standalone: true,
      imports: [SlideToggleComponent],
      template: `<k-slide-toggle [label]="'Test'" [checked]="checked()" />`,
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
    expect(f.nativeElement.querySelector('k-slide-toggle').classList.contains('active')).toBe(true);
  });
});
