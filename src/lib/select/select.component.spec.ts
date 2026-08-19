import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SelectComponent } from './select.component';
import { MenuOptionComponent } from '../menu-option/menu-option.component';

@Component({
  standalone: true,
  imports: [SelectComponent, MenuOptionComponent],
  template: `
    <k-select [value]="starting()">
      <k-menu-option value="a">Apple</k-menu-option>
      <k-menu-option value="b">Banana</k-menu-option>
      <k-menu-option value="c" disabled>Cherry</k-menu-option>
    </k-select>
  `,
})
class SelectHostComponent {
  starting = signal('b');
}

describe('SelectComponent', () => {
  let fixture: ComponentFixture<SelectComponent>;
  let component: SelectComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display placeholder by default', () => {
    const triggerText = fixture.nativeElement.querySelector('.trigger-text');
    expect(triggerText.textContent).toBe('Select...');
  });

  it('should display custom placeholder', async () => {
    fixture.componentRef.setInput('placeholder', 'Choose...');
    fixture.detectChanges();
    await fixture.whenStable();
    const triggerText = fixture.nativeElement.querySelector('.trigger-text');
    expect(triggerText.textContent).toBe('Choose...');
  });

  it('should display label when provided', async () => {
    fixture.componentRef.setInput('label', 'Country');
    fixture.detectChanges();
    await fixture.whenStable();
    const labelEl = fixture.nativeElement.querySelector('.label');
    expect(labelEl?.textContent).toBe('Country');
  });

  it('should render a trigger button', () => {
    const trigger = fixture.nativeElement.querySelector('.trigger');
    expect(trigger).toBeTruthy();
  });

  it('should render a dropdown element', () => {
    const dropdown = fixture.nativeElement.querySelector('.dropdown');
    expect(dropdown).toBeTruthy();
  });

  it('should start closed', () => {
    expect(component.open()).toBe(false);
  });

  it('should not emit valueChange during initialization', () => {
    const f = TestBed.createComponent(SelectComponent);
    const emitted: string[] = [];
    @Component({
      standalone: true,
      imports: [SelectComponent],
      template: `<k-select (valueChange)="emitted.push($event)" />`,
    })
    class EmitHostComponent {
      emitted = emitted;
    }
    const ef = TestBed.createComponent(EmitHostComponent);
    ef.detectChanges();
    expect(emitted).toEqual([]);
  });

  it('should handle disabled="" attribute via booleanAttribute', async () => {
    fixture.componentRef.setInput('disabled', '');
    fixture.detectChanges();
    await fixture.whenStable();
    const trigger = fixture.nativeElement.querySelector('.trigger');
    expect(trigger.disabled).toBe(true);
  });

  it('should disable the trigger button when disabled', async () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    await fixture.whenStable();
    const trigger = fixture.nativeElement.querySelector('.trigger');
    expect(trigger.disabled).toBe(true);
  });

  it('togglePopover is a no-op when disabled', async () => {
    const f = TestBed.createComponent(SelectComponent);
    f.componentRef.setInput('disabled', true);
    let toggleCalled = false;
    const dropdown = f.nativeElement.querySelector('.dropdown');
    dropdown.togglePopover = () => {
      toggleCalled = true;
    };
    f.detectChanges();
    await f.whenStable();

    f.componentInstance.togglePopover();
    expect(toggleCalled).toBe(false);
  });

  it('onPopoverToggle sets open signal from ToggleEvent', async () => {
    const fixture2 = TestBed.createComponent(SelectHostComponent);
    fixture2.detectChanges();
    await fixture2.whenStable();

    const select: SelectComponent = fixture2.debugElement.query(
      By.directive(SelectComponent),
    ).componentInstance;

    const openEv = new Event('toggle') as ToggleEvent;
    Object.defineProperty(openEv, 'newState', { value: 'open', configurable: true });
    select.onPopoverToggle(openEv);
    expect(select.open()).toBe(true);

    const closedEv = new Event('toggle') as ToggleEvent;
    Object.defineProperty(closedEv, 'newState', { value: 'closed', configurable: true });
    select.onPopoverToggle(closedEv);
    expect(select.open()).toBe(false);
  });
});

describe('SelectComponent selection', () => {
  it('should apply an initially bound value and mark the option selected', async () => {
    const fixture = TestBed.createComponent(SelectHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const select: SelectComponent = fixture.debugElement.query(
      By.directive(SelectComponent),
    ).componentInstance;
    expect(select.value()).toBe('b');
    expect(select.triggerText()).toBe('Banana');
    expect(select.options.find(o => o.value() === 'b')?.selected).toBe(true);
  });

  it('should not select a disabled option via bound value', async () => {
    const fixture = TestBed.createComponent(SelectHostComponent);
    fixture.componentInstance.starting.set('c');
    fixture.detectChanges();
    await fixture.whenStable();

    const select: SelectComponent = fixture.debugElement.query(
      By.directive(SelectComponent),
    ).componentInstance;
    expect(select.value()).toBe('');
    expect(select.triggerText()).toBe('');
  });

  it('should select an enabled option on dropdown click and emit once', async () => {
    const fixture = TestBed.createComponent(SelectHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const dropdown = fixture.nativeElement.querySelector('.dropdown');
    dropdown.hidePopover = () => {};

    const select: SelectComponent = fixture.debugElement.query(
      By.directive(SelectComponent),
    ).componentInstance;
    const emitted: string[] = [];
    @Component({
      standalone: true,
      imports: [SelectComponent, MenuOptionComponent],
      template: `
        <k-select (valueChange)="emitted.push($event)">
          <k-menu-option value="a">Apple</k-menu-option>
          <k-menu-option value="b">Banana</k-menu-option>
        </k-select>
      `,
    })
    class EmitHostComponent {
      emitted = emitted;
    }
    const ef = TestBed.createComponent(EmitHostComponent);
    ef.detectChanges();
    await ef.whenStable();
    const eDropdown = ef.nativeElement.querySelector('.dropdown');
    eDropdown.hidePopover = () => {};

    const optionEls = ef.nativeElement.querySelectorAll('k-menu-option');
    optionEls[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    ef.detectChanges();
    await ef.whenStable();

    expect(ef.componentInstance.emitted).toEqual(['a']);
    expect(ef.componentInstance.emitted).toContain('a');
  });

  it('should not select a disabled option on dropdown click', async () => {
    const fixture = TestBed.createComponent(SelectHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const dropdown = fixture.nativeElement.querySelector('.dropdown');
    dropdown.hidePopover = () => {};

    const select: SelectComponent = fixture.debugElement.query(
      By.directive(SelectComponent),
    ).componentInstance;
    const optionEls = fixture.nativeElement.querySelectorAll('k-menu-option');
    optionEls[2].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(select.value()).toBe('b');
  });

  it('should react to late external value changes', async () => {
    const fixture = TestBed.createComponent(SelectHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const select: SelectComponent = fixture.debugElement.query(
      By.directive(SelectComponent),
    ).componentInstance;
    fixture.componentInstance.starting.set('a');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(select.value()).toBe('a');
    expect(select.triggerText()).toBe('Apple');
  });

  it('togglePopover toggles the dropdown element', async () => {
    const fixture = TestBed.createComponent(SelectHostComponent);
    let toggleCalled = false;
    const dropdown = fixture.nativeElement.querySelector('.dropdown');
    dropdown.togglePopover = () => {
      toggleCalled = true;
    };
    fixture.detectChanges();
    await fixture.whenStable();

    const select: SelectComponent = fixture.debugElement.query(
      By.directive(SelectComponent),
    ).componentInstance;
    select.togglePopover();
    expect(toggleCalled).toBe(true);
  });
});
