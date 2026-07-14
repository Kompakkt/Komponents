import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
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

  it('should resolve named color to --color-<name> variable', () => {
    fixture.componentRef.setInput('style', 'solid');
    fixture.componentRef.setInput('color', 'primary');
    fixture.detectChanges();
    expect(fixture.nativeElement.style.getPropertyValue('--color')).toBe(
      'var(--color-primary, currentColor)',
    );
  });

  it('should resolve --color-* custom property token', () => {
    fixture.componentRef.setInput('style', 'solid');
    fixture.componentRef.setInput('color', '--color-primary');
    fixture.detectChanges();
    expect(fixture.nativeElement.style.getPropertyValue('--color')).toBe(
      'var(--color-primary, currentColor)',
    );
  });

  it('should resolve rgb() color literally', () => {
    fixture.componentRef.setInput('style', 'solid');
    fixture.componentRef.setInput('color', 'rgb(0, 0, 0)');
    fixture.detectChanges();
    expect(fixture.nativeElement.style.getPropertyValue('--color')).toBe('rgb(0, 0, 0)');
  });

  it('should resolve hex color literally', () => {
    fixture.componentRef.setInput('style', 'outlined');
    fixture.componentRef.setInput('color', '#ff8800');
    fixture.detectChanges();
    expect(fixture.nativeElement.style.getPropertyValue('--color')).toBe('#ff8800');
  });

  it('should fall back to currentColor for unknown color', () => {
    fixture.componentRef.setInput('style', 'solid');
    fixture.componentRef.setInput('color', 'unknown');
    fixture.detectChanges();
    expect(fixture.nativeElement.style.getPropertyValue('--color')).toBe(
      'var(--color-unknown, currentColor)',
    );
  });

  it('should click host on Enter', () => {
    const el = fixture.nativeElement as HTMLElement;
    const clickSpy = vi.spyOn(el, 'click').mockImplementation(() => {});
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it('should click host on Space', () => {
    const el = fixture.nativeElement as HTMLElement;
    const clickSpy = vi.spyOn(el, 'click').mockImplementation(() => {});
    const event = new KeyboardEvent('keydown', { key: ' ' });
    el.dispatchEvent(event);
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it('should not click on other keys', () => {
    const el = fixture.nativeElement as HTMLElement;
    const clickSpy = vi.spyOn(el, 'click').mockImplementation(() => {});
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    expect(clickSpy).not.toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it('should not click when disabled', async () => {
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const clickSpy = vi.spyOn(el, 'click').mockImplementation(() => {});
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(clickSpy).not.toHaveBeenCalled();
    clickSpy.mockRestore();
  });
});
