import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have button role', () => {
    expect(fixture.nativeElement.getAttribute('role')).toBe('button');
  });

  it('should have tabindex 0 by default', () => {
    expect(fixture.nativeElement.getAttribute('tabindex')).toBe('0');
  });

  it('should set tabindex to -1 when disabled', async () => {
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();
    expect(fixture.nativeElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should set aria-disabled when disabled', async () => {
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();
    expect(fixture.nativeElement.getAttribute('aria-disabled')).toBe('true');
  });

  it('should not have aria-disabled when enabled', () => {
    expect(fixture.nativeElement.getAttribute('aria-disabled')).toBeNull();
  });

  it('should handle disabled="" attribute via booleanAttribute', async () => {
    fixture.componentRef.setInput('disabled', '');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.classList.contains('disabled')).toBe(true);
    expect(fixture.nativeElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should render ng-content', () => {
    const text = 'Click me';
    fixture.nativeElement.textContent = text;
    expect(fixture.nativeElement.textContent).toContain(text);
  });
});
