import { TestBed } from '@angular/core/testing';
import { TestParentComponent } from './test-parent.component';
import { InputComponent } from '../input/input.component';
import { SliderComponent } from '../slider/slider.component';
import { LabelledCheckboxComponent } from '../labelled-checkbox/labelled-checkbox.component';
import { SlideToggleComponent } from '../slide-toggle/slide-toggle.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { SelectComponent } from '../select/select.component';

// ponytail: Popover API not available in happy-dom
beforeEach(() => {
  if (!('showPopover' in HTMLElement.prototype)) {
    (HTMLElement.prototype as any).showPopover = () => {};
    (HTMLElement.prototype as any).hidePopover = () => {};
  }
});

describe('TestParentComponent', () => {
  function createFixture(data?: {
    name?: string;
    volume?: number;
    active?: boolean;
    toggle?: boolean;
    bio?: string;
    color?: string;
  }) {
    const fixture = TestBed.createComponent(TestParentComponent);
    if (data) {
      fixture.componentInstance.form.set({
        name: data.name ?? '',
        volume: data.volume ?? 0,
        active: data.active ?? false,
        toggle: data.toggle ?? false,
        bio: data.bio ?? '',
        color: data.color ?? '',
      });
    }
    fixture.detectChanges();
    return fixture;
  }

  describe('downward: parent signal → component', () => {
    it('renders initial form data in all components', () => {
      const fixture = createFixture({
        name: 'Alice',
        volume: 75,
        active: true,
        toggle: true,
        bio: 'Hello',
        color: 'blue',
      });

      expect(fixture.componentInstance.inputComp.value()).toBe('Alice');
      expect(fixture.componentInstance.sliderComp.value()).toBe(75);
      expect(fixture.componentInstance.checkboxComp.checked()).toBe(true);
      expect(fixture.componentInstance.toggleComp.checked()).toBe(true);
      expect(fixture.componentInstance.textareaComp.value()).toBe('Hello');
      expect(fixture.componentInstance.selectComp.value()).toBe('blue');
    });

    it('propagates name change to input', () => {
      const fixture = createFixture({ name: 'Alice' });
      fixture.componentInstance.form.update(f => ({ ...f, name: 'Bob' }));
      fixture.detectChanges();
      expect(fixture.componentInstance.inputComp.value()).toBe('Bob');
    });

    it('propagates volume change to slider', () => {
      const fixture = createFixture({ volume: 0 });
      fixture.componentInstance.form.update(f => ({ ...f, volume: 50 }));
      fixture.detectChanges();
      expect(fixture.componentInstance.sliderComp.value()).toBe(50);
    });

    it('propagates active change to checkbox', () => {
      const fixture = createFixture({ active: false });
      fixture.componentInstance.form.update(f => ({ ...f, active: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.checkboxComp.checked()).toBe(true);
    });

    it('propagates toggle change to slide-toggle', () => {
      const fixture = createFixture({ toggle: false });
      fixture.componentInstance.form.update(f => ({ ...f, toggle: true }));
      fixture.detectChanges();
      expect(fixture.componentInstance.toggleComp.checked()).toBe(true);
    });

    it('propagates bio change to textarea', () => {
      const fixture = createFixture({ bio: '' });
      fixture.componentInstance.form.update(f => ({ ...f, bio: 'new bio' }));
      fixture.detectChanges();
      expect(fixture.componentInstance.textareaComp.value()).toBe('new bio');
    });

    it('propagates color change to select', () => {
      const fixture = createFixture({ color: 'red' });
      fixture.componentInstance.form.update(f => ({ ...f, color: 'green' }));
      fixture.detectChanges();
      expect(fixture.componentInstance.selectComp.value()).toBe('green');
    });
  });

  describe('upward: component → parent signal', () => {
    it('SlideToggle.toggle() emits synchronously and updates parent', () => {
      const fixture = createFixture({ toggle: false });
      const toggle = fixture.componentInstance.toggleComp;
      toggle.toggle();
      expect(fixture.componentInstance.form().toggle).toBe(true);
    });
  });

  describe('full form replacement', () => {
    it('replacing entire form updates all components', () => {
      const fixture = createFixture();
      fixture.componentInstance.form.set({
        name: 'Bob',
        volume: 42,
        active: true,
        toggle: true,
        bio: 'full',
        color: 'green',
      });
      fixture.detectChanges();

      expect(fixture.componentInstance.inputComp.value()).toBe('Bob');
      expect(fixture.componentInstance.sliderComp.value()).toBe(42);
      expect(fixture.componentInstance.checkboxComp.checked()).toBe(true);
      expect(fixture.componentInstance.toggleComp.checked()).toBe(true);
      expect(fixture.componentInstance.textareaComp.value()).toBe('full');
      expect(fixture.componentInstance.selectComp.value()).toBe('green');
    });
  });

  describe('cross-field independence', () => {
    it('changing one field does not affect others', () => {
      const fixture = createFixture({
        name: 'A',
        volume: 10,
        active: false,
        toggle: false,
        bio: 'x',
        color: 'red',
      });

      fixture.componentInstance.form.update(f => ({ ...f, name: 'B' }));
      fixture.detectChanges();

      expect(fixture.componentInstance.inputComp.value()).toBe('B');
      expect(fixture.componentInstance.sliderComp.value()).toBe(10);
      expect(fixture.componentInstance.checkboxComp.checked()).toBe(false);
      expect(fixture.componentInstance.toggleComp.checked()).toBe(false);
      expect(fixture.componentInstance.textareaComp.value()).toBe('x');
      expect(fixture.componentInstance.selectComp.value()).toBe('red');
    });
  });
});
