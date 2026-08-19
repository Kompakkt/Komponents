import { TestBed } from '@angular/core/testing';
import { TestParentComponent } from './test-parent.component';

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
    const p = fixture.componentInstance;
    if (data) {
      p.name.set(data.name ?? '');
      p.volume.set(data.volume ?? 0);
      p.active.set(data.active ?? false);
      p.toggle.set(data.toggle ?? false);
      p.bio.set(data.bio ?? '');
      p.color.set(data.color ?? '');
    }
    fixture.detectChanges();
    return fixture;
  }

  describe('downward: parent signal → component', () => {
    it('renders initial data in all components', () => {
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
      fixture.componentInstance.name.set('Bob');
      fixture.detectChanges();
      expect(fixture.componentInstance.inputComp.value()).toBe('Bob');
    });

    it('propagates volume change to slider', () => {
      const fixture = createFixture({ volume: 0 });
      fixture.componentInstance.volume.set(50);
      fixture.detectChanges();
      expect(fixture.componentInstance.sliderComp.value()).toBe(50);
    });

    it('propagates active change to checkbox', () => {
      const fixture = createFixture({ active: false });
      fixture.componentInstance.active.set(true);
      fixture.detectChanges();
      expect(fixture.componentInstance.checkboxComp.checked()).toBe(true);
    });

    it('propagates toggle change to slide-toggle', () => {
      const fixture = createFixture({ toggle: false });
      fixture.componentInstance.toggle.set(true);
      fixture.detectChanges();
      expect(fixture.componentInstance.toggleComp.checked()).toBe(true);
    });

    it('propagates bio change to textarea', () => {
      const fixture = createFixture({ bio: '' });
      fixture.componentInstance.bio.set('new bio');
      fixture.detectChanges();
      expect(fixture.componentInstance.textareaComp.value()).toBe('new bio');
    });

    it('propagates color change to select', () => {
      const fixture = createFixture({ color: 'red' });
      fixture.componentInstance.color.set('green');
      fixture.detectChanges();
      expect(fixture.componentInstance.selectComp.value()).toBe('green');
    });
  });

  describe('upward: component → parent signal', () => {
    it('SlideToggle.toggle() emits synchronously and updates parent', () => {
      const fixture = createFixture({ toggle: false });
      const toggle = fixture.componentInstance.toggleComp;
      toggle.toggle();
      expect(fixture.componentInstance.toggle()).toBe(true);
    });

    it('input typing updates parent signal without reverting', async () => {
      const fixture = createFixture({ name: '' });
      const input = fixture.nativeElement.querySelector('k-input input');
      input.value = 'Foo';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      await fixture.whenStable();
      expect(fixture.componentInstance.name()).toBe('Foo');
      expect(input.value).toBe('Foo');
    });

    it('checkbox click updates parent signal and stays checked', async () => {
      const fixture = createFixture({ active: false });
      const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      await fixture.whenStable();
      expect(fixture.componentInstance.active()).toBe(true);
      expect(fixture.componentInstance.checkboxComp.checked()).toBe(true);
    });
  });

  describe('full form replacement', () => {
    it('replacing all parent signals updates all components', () => {
      const fixture = createFixture();
      const p = fixture.componentInstance;
      p.name.set('Bob');
      p.volume.set(42);
      p.active.set(true);
      p.toggle.set(true);
      p.bio.set('full');
      p.color.set('green');
      fixture.detectChanges();

      expect(p.inputComp.value()).toBe('Bob');
      expect(p.sliderComp.value()).toBe(42);
      expect(p.checkboxComp.checked()).toBe(true);
      expect(p.toggleComp.checked()).toBe(true);
      expect(p.textareaComp.value()).toBe('full');
      expect(p.selectComp.value()).toBe('green');
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

      fixture.componentInstance.name.set('B');
      fixture.detectChanges();

      const p = fixture.componentInstance;
      expect(p.inputComp.value()).toBe('B');
      expect(p.sliderComp.value()).toBe(10);
      expect(p.checkboxComp.checked()).toBe(false);
      expect(p.toggleComp.checked()).toBe(false);
      expect(p.textareaComp.value()).toBe('x');
      expect(p.selectComp.value()).toBe('red');
    });
  });
});
