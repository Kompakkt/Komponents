import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { MenuOptionComponent } from '../menu-option/menu-option.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [MenuComponent, MenuOptionComponent],
  template: `
    <k-menu label="Actions">
      <k-menu-option value="edit">Edit</k-menu-option>
      <k-menu-option value="delete">Delete</k-menu-option>
    </k-menu>
  `,
})
class TestHostComponent {}

describe('MenuComponent', () => {
  it('should create', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    expect(fixture.componentInstance).toBeDefined();
  });

  it('should render label', async () => {
    const fixture = TestBed.createComponent(MenuComponent);
    fixture.componentRef.setInput('label', 'Actions');
    fixture.detectChanges();
    await fixture.whenStable();
    const labelEl = fixture.nativeElement.querySelector('k-menu-option strong');
    expect(labelEl?.textContent).toContain('Actions');
  });

  it('should render projected content in a test host', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('k-menu')).toBeTruthy();
    const options = fixture.nativeElement.querySelectorAll('k-menu-option');
    expect(options.length).toBe(3);
  });

  it('should set width style when width input is provided', async () => {
    const fixture = TestBed.createComponent(MenuComponent);
    fixture.componentRef.setInput('width', '200');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.style.getPropertyValue('--width')).toBe('200px');
  });
});
