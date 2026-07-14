import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AutocompleteComponent } from './autocomplete.component';
import { InputComponent } from '../input/input.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [AutocompleteComponent, InputComponent],
  template: `
    <k-autocomplete [inputElement]="inputComp">
      <span>Option 1</span>
    </k-autocomplete>
    <k-input #inputComp label="Search" />
  `,
})
class TestHostComponent {}

describe('AutocompleteComponent', () => {
  it('should create', () => {
    const fixture = TestBed.createComponent(AutocompleteComponent);
    expect(fixture.componentInstance).toBeDefined();
  });

  it('should set max-height style', () => {
    const fixture = TestBed.createComponent(AutocompleteComponent);
    fixture.componentRef.setInput('inputElement', { focused: () => false } as any);
    fixture.detectChanges();
    expect(fixture.nativeElement.style.getPropertyValue('--max-height')).toBe('240px');
  });

  it('should accept custom max-height via alias', () => {
    const fixture = TestBed.createComponent(AutocompleteComponent);
    fixture.componentRef.setInput('inputElement', { focused: () => false } as any);
    fixture.componentRef.setInput('max-height', 300);
    fixture.detectChanges();
    expect(fixture.nativeElement.style.getPropertyValue('--max-height')).toBe('300px');
  });

  it('should render with input in a test host', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('k-autocomplete')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('k-input')).toBeTruthy();
  });

  it('should accept string max-height without appending px', () => {
    const fixture = TestBed.createComponent(AutocompleteComponent);
    fixture.componentRef.setInput('inputElement', { focused: () => false } as any);
    fixture.componentRef.setInput('max-height', '50vh');
    fixture.detectChanges();
    expect(fixture.nativeElement.style.getPropertyValue('--max-height')).toBe('50vh');
  });

  it('should keep numeric max-height appending px', () => {
    const fixture = TestBed.createComponent(AutocompleteComponent);
    fixture.componentRef.setInput('inputElement', { focused: () => false } as any);
    fixture.componentRef.setInput('max-height', 300);
    fixture.detectChanges();
    expect(fixture.nativeElement.style.getPropertyValue('--max-height')).toBe('300px');
  });

  it('opened should track the bound input focus state', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const autocomplete: AutocompleteComponent = fixture.debugElement.query(
      By.directive(AutocompleteComponent),
    ).componentInstance;
    const input: InputComponent = fixture.debugElement.query(
      By.directive(InputComponent),
    ).componentInstance;

    expect(autocomplete.opened()).toBe(false);
    input.setFocus(true);
    fixture.detectChanges();
    await new Promise(r => setTimeout(r, 110));
    fixture.detectChanges();
    expect(autocomplete.opened()).toBe(true);

    input.setFocus(false);
    fixture.detectChanges();
    await new Promise(r => setTimeout(r, 110));
    fixture.detectChanges();
    expect(autocomplete.opened()).toBe(false);
  });
});
