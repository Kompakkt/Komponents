import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';

@Component({
  standalone: true,
  imports: [InputComponent],
  template: `<k-input [label]="label" [(value)]="value" />`,
})
class InputHostComponent {
  label = 'Name';
  value = '';
}

describe('InputComponent', () => {
  let fixture: ComponentFixture<InputComponent>;
  let component: InputComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Name');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display the label', () => {
    const labelEl = fixture.nativeElement.querySelector('.label');
    expect(labelEl.textContent).toBe('Name');
  });

  it('should render an input element', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
  });

  it('should set input type from input', async () => {
    fixture.componentRef.setInput('type', 'password');
    fixture.detectChanges();
    await fixture.whenStable();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('type')).toBe('password');
  });

  it('should update value on input event', () => {
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    expect(component.value()).toBe('hello');
  });

  it('should reflect an initially bound value', async () => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Prefilled');
    fixture.componentRef.setInput('value', 'pre');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.value()).toBe('pre');
  });

  it('should react to late external value changes', async () => {
    fixture.componentRef.setInput('value', 'first');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.componentRef.setInput('value', 'second');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.value()).toBe('second');
  });

  it('should handle floatingLabel="" attribute via booleanAttribute', async () => {
    fixture.componentRef.setInput('floatingLabel', '');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.classList.contains('floating-label')).toBe(true);
  });

  it('should set floating label class when floatingLabel is true', async () => {
    fixture.componentRef.setInput('floatingLabel', true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.classList.contains('floating-label')).toBe(true);
  });

  it('should display prefix and suffix', async () => {
    fixture.componentRef.setInput('prefix', '$');
    fixture.componentRef.setInput('suffix', '.00');
    fixture.detectChanges();
    await fixture.whenStable();
    const prefixEl = fixture.nativeElement.querySelector('.prefix');
    const suffixEl = fixture.nativeElement.querySelector('.suffix');
    expect(prefixEl.textContent).toContain('$');
    expect(suffixEl.textContent).toContain('.00');
  });

  it('should store raw value for number type', () => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Qty');
    fixture.componentRef.setInput('type', 'number');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    input.value = '42';
    input.dispatchEvent(new Event('input'));
    expect(component.value()).toBe('42');
  });

  it('should set focused on focus event', () => {
    const input = fixture.nativeElement.querySelector('input');
    input.dispatchEvent(new Event('focus'));
    expect(component.focused()).toBe(true);
  });

  it('should clear focused on blur event', () => {
    const input = fixture.nativeElement.querySelector('input');
    component.focused.set(true);
    input.dispatchEvent(new Event('blur'));
    expect(component.focused()).toBe(false);
  });
});

describe('InputComponent with host bindings', () => {
  let fixture: ComponentFixture<InputHostComponent>;
  let host: InputHostComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(InputHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  function getInput() {
    return fixture.nativeElement.querySelector('input');
  }

  it('should not emit valueChange during initialization', async () => {
    const emitted: string[] = [];
    @Component({
      standalone: true,
      imports: [InputComponent],
      template: `<k-input [label]="'Test'" (valueChange)="emitted.push($event)" />`,
    })
    class EmitHostComponent {
      emitted = emitted;
    }
    const f = TestBed.createComponent(EmitHostComponent);
    f.detectChanges();
    await f.whenStable();
    expect(emitted).toEqual([]);
  });

  it('should emit valueChange on user input only', async () => {
    const emitted: string[] = [];
    @Component({
      standalone: true,
      imports: [InputComponent],
      template: `<k-input [label]="'Test'" (valueChange)="emitted.push($event)" />`,
    })
    class EmitHostComponent {
      emitted = emitted;
    }
    const f = TestBed.createComponent(EmitHostComponent);
    f.detectChanges();
    await f.whenStable();

    const input = f.nativeElement.querySelector('input');
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    f.detectChanges();
    await f.whenStable();

    expect(f.componentInstance.emitted).toEqual(['test']);
  });

  it('should update the two-way bound host field on typing', async () => {
    const input = getInput();
    input.value = 'Foo';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.value).toBe('Foo');
    expect(input.value).toBe('Foo');
  });

  it('should emit every keystroke when parent echoes value back', async () => {
    @Component({
      standalone: true,
      imports: [InputComponent],
      template: `<k-input [label]="'Test'" [value]="value()" (valueChange)="value.set($event)" />`,
    })
    class EchoHostComponent {
      value = signal('');
    }
    const f = TestBed.createComponent(EchoHostComponent);
    f.detectChanges();
    await f.whenStable();

    const input = f.nativeElement.querySelector('input');
    for (const partial of ['F', 'Fo', 'Foo']) {
      input.value = partial;
      input.dispatchEvent(new Event('input'));
      f.detectChanges();
      await f.whenStable();
    }
    expect(f.componentInstance.value()).toBe('Foo');
    expect(input.value).toBe('Foo');
  });

  it('should reflect late external value changes in one-way binding', async () => {
    @Component({
      standalone: true,
      imports: [InputComponent],
      template: `<k-input [label]="'Test'" [value]="value()" />`,
    })
    class OneWayHostComponent {
      value = signal('');
    }
    const f = TestBed.createComponent(OneWayHostComponent);
    f.detectChanges();
    await f.whenStable();

    f.componentInstance.value.set('external');
    f.detectChanges();
    await f.whenStable();
    expect(f.nativeElement.querySelector('input').value).toBe('external');
  });
});
