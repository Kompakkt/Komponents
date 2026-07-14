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

@Component({
  standalone: true,
  imports: [MenuComponent, MenuOptionComponent],
  template: `
    <div class="anchor">
      <k-menu label="Actions">
        <k-menu-option value="edit">Edit</k-menu-option>
      </k-menu>
    </div>
  `,
})
class MenuHostComponent {}

describe('MenuComponent interactions', () => {
  function setup() {
    (HTMLElement.prototype as any).showPopover = () => {};
    (HTMLElement.prototype as any).hidePopover = () => {};
    const fixture = TestBed.createComponent(MenuHostComponent);
    const menuEl = fixture.nativeElement.querySelector('k-menu');
    let popoverOpen = false;
    menuEl.showPopover = () => { popoverOpen = true; };
    menuEl.hidePopover = () => { popoverOpen = false; };
    const realMatches = menuEl.matches.bind(menuEl);
    menuEl.matches = (sel: string) => sel === ':popover-open' ? popoverOpen : realMatches(sel);
    fixture.detectChanges();
    return { fixture, menuEl, getOpen: () => popoverOpen, setOpen: (v: boolean) => { popoverOpen = v; } };
  }

  afterEach(() => {
    delete (HTMLElement.prototype as any).showPopover;
    delete (HTMLElement.prototype as any).hidePopover;
  });

  it('shows popover on parent mouseenter', () => {
    const { fixture, getOpen } = setup();
    fixture.nativeElement.querySelector('.anchor').dispatchEvent(new Event('mouseenter'));
    expect(getOpen()).toBe(true);
  });

  it('shows popover on parent focus', () => {
    const { fixture, getOpen } = setup();
    fixture.nativeElement.querySelector('.anchor').dispatchEvent(new Event('focus'));
    expect(getOpen()).toBe(true);
  });

  it('hides popover on parent blur', () => {
    const { fixture, setOpen, getOpen } = setup();
    setOpen(true);
    fixture.nativeElement.querySelector('.anchor').dispatchEvent(new Event('blur'));
    expect(getOpen()).toBe(false);
  });

  it('hides popover when mouse leaves parent to outside', () => {
    const { fixture, menuEl, setOpen, getOpen } = setup();
    setOpen(true);
    const ev = new MouseEvent('mouseleave');
    Object.defineProperty(ev, 'relatedTarget', { value: document.body });
    fixture.nativeElement.querySelector('.anchor').dispatchEvent(ev);
    expect(getOpen()).toBe(false);
  });

  it('does not hide when mouse leaves parent toward the popover', () => {
    const { fixture, menuEl, setOpen, getOpen } = setup();
    setOpen(true);
    const ev = new MouseEvent('mouseleave');
    Object.defineProperty(ev, 'relatedTarget', { value: menuEl });
    fixture.nativeElement.querySelector('.anchor').dispatchEvent(ev);
    expect(getOpen()).toBe(true);
  });

  it('does not hide when mouse leaves popover toward the anchor', () => {
    const { fixture, menuEl, setOpen, getOpen } = setup();
    setOpen(true);
    const anchor = fixture.nativeElement.querySelector('.anchor');
    const ev = new MouseEvent('mouseleave');
    Object.defineProperty(ev, 'relatedTarget', { value: anchor });
    menuEl.dispatchEvent(ev);
    expect(getOpen()).toBe(true);
  });

  it('hides when mouse leaves popover to outside', () => {
    const { fixture, menuEl, setOpen, getOpen } = setup();
    setOpen(true);
    const ev = new MouseEvent('mouseleave');
    Object.defineProperty(ev, 'relatedTarget', { value: document.body });
    menuEl.dispatchEvent(ev);
    expect(getOpen()).toBe(false);
  });
});
