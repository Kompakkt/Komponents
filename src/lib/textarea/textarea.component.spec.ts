import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextareaComponent } from './textarea.component';

@Component({
  standalone: true,
  imports: [TextareaComponent],
  template: `<k-textarea [label]="label" [(value)]="value" />`,
})
class TextareaHostComponent {
  label = 'Description';
  value = '';
}

describe('TextareaComponent', () => {
  let fixture: ComponentFixture<TextareaComponent>;
  let component: TextareaComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Description');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display the label', () => {
    const labelEl = fixture.nativeElement.querySelector('.label');
    expect(labelEl.textContent).toBe('Description');
  });

  it('should render a textarea element', () => {
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea).toBeTruthy();
  });

  it('should set min-rows and max-rows styles', () => {
    expect(fixture.nativeElement.style.getPropertyValue('--min-rows')).toBe('4');
    expect(fixture.nativeElement.style.getPropertyValue('--max-rows')).toBe('24');
  });

  it('should update value on input event', () => {
    const textarea = fixture.nativeElement.querySelector('textarea');
    textarea.value = 'new text';
    textarea.dispatchEvent(new Event('input'));
    expect(component.value()).toBe('new text');
  });

  it('should reflect an initially bound value', async () => {
    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Prefilled');
    fixture.componentRef.setInput('value', 'initial');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.value()).toBe('initial');
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

  it('should set resize style', async () => {
    fixture.componentRef.setInput('resize', 'none');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.style.getPropertyValue('--resize')).toBe('none');
  });
});

describe('TextareaComponent with host bindings', () => {
  let fixture: ComponentFixture<TextareaHostComponent>;
  let host: TextareaHostComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TextareaHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  function getTextarea() {
    return fixture.nativeElement.querySelector('textarea');
  }

  it('should not emit valueChange during initialization', async () => {
    const emitted: string[] = [];
    @Component({
      standalone: true,
      imports: [TextareaComponent],
      template: `<k-textarea [label]="'Test'" (valueChange)="emitted.push($event)" />`,
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
      imports: [TextareaComponent],
      template: `<k-textarea [label]="'Test'" (valueChange)="emitted.push($event)" />`,
    })
    class EmitHostComponent {
      emitted = emitted;
    }
    const f = TestBed.createComponent(EmitHostComponent);
    f.detectChanges();
    await f.whenStable();

    const textarea = f.nativeElement.querySelector('textarea');
    textarea.value = 'next';
    textarea.dispatchEvent(new Event('input'));
    f.detectChanges();
    await f.whenStable();

    expect(f.componentInstance.emitted).toEqual(['next']);
  });

  it('should update the two-way bound host field on typing', async () => {
    const textarea = getTextarea();
    textarea.value = 'Foo';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.value).toBe('Foo');
    expect(textarea.value).toBe('Foo');
  });

  it('should reflect late external value changes in one-way binding', async () => {
    @Component({
      standalone: true,
      imports: [TextareaComponent],
      template: `<k-textarea [label]="'Test'" [value]="value()" />`,
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
    expect(f.nativeElement.querySelector('textarea').value).toBe('external');
  });
});
