import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MenuOptionComponent } from './menu-option.component';

@Component({
  standalone: true,
  imports: [MenuOptionComponent],
  template: '<k-menu-option>My Option</k-menu-option>',
})
class TitleTestHost {}

describe('MenuOptionComponent', () => {
  let fixture: ComponentFixture<MenuOptionComponent>;
  let component: MenuOptionComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should not be disabled by default', () => {
    expect(fixture.nativeElement.classList.contains('disabled')).toBe(false);
  });

  it('should have disabled class when disabled input is set', async () => {
    fixture.componentRef.setInput('disabled', '');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.classList.contains('disabled')).toBe(true);
  });

  it('should have selected class when selected', () => {
    const f = TestBed.createComponent(MenuOptionComponent);
    f.componentInstance.selected = true;
    f.detectChanges();
    expect(f.nativeElement.classList.contains('selected')).toBe(true);
    f.destroy();
  });

  it('should set title from projected text content', () => {
    const hostFixture = TestBed.createComponent(TitleTestHost);
    hostFixture.detectChanges();
    const optionEl = hostFixture.nativeElement.querySelector('k-menu-option');
    expect(optionEl.getAttribute('title')).toBe('My Option');
  });
});
