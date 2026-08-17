import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';

type Pos = 'above' | 'below' | 'left' | 'right';

@Component({
  standalone: true,
  imports: [TooltipDirective],
  template:
    '<button [tooltip]="tooltipText" [tooltipPosition]="pos" [tooltipPadding]="pad">Hover me</button>',
})
class TestHostComponent {
  tooltipText = 'Help text';
  pos: Pos = 'above';
  pad = 12;
}

function setup(overrides: Partial<TestHostComponent> = {}) {
  (HTMLElement.prototype as any).showPopover = () => {};
  (HTMLElement.prototype as any).hidePopover = () => {};
  const fixture = TestBed.createComponent(TestHostComponent);
  Object.assign(fixture.componentInstance, overrides);
  fixture.detectChanges();
  return fixture;
}

function cleanup() {
  delete (HTMLElement.prototype as any).showPopover;
  delete (HTMLElement.prototype as any).hidePopover;
  document.querySelectorAll('.k-tooltip-popover').forEach(el => el.remove());
}

describe('TooltipDirective', () => {
  afterEach(cleanup);

  it('shows tooltip with configured text on mouseenter', () => {
    const fixture = setup();
    fixture.nativeElement.querySelector('button').dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    const tooltip = document.querySelector<HTMLElement>('.k-tooltip-popover');
    expect(tooltip?.textContent).toContain('Help text');
  });

  it('hides tooltip on mouseleave', () => {
    const fixture = setup();
    let hideCalled = false;
    (HTMLElement.prototype as any).hidePopover = () => {
      hideCalled = true;
    };
    const button = fixture.nativeElement.querySelector('button');
    button.dispatchEvent(new Event('mouseenter'));
    button.dispatchEvent(new Event('mouseleave'));
    expect(hideCalled).toBe(true);
  });

  it('does not show when text is empty', () => {
    let showCalled = false;
    (HTMLElement.prototype as any).showPopover = () => {
      showCalled = true;
    };
    const fixture = setup({ tooltipText: '' });
    fixture.nativeElement.querySelector('button').dispatchEvent(new Event('mouseenter'));
    expect(showCalled).toBe(false);
  });

  it.each([
    ['above', '-12px', '0px'],
    ['below', '12px', '0px'],
    ['left', '0px', '-12px'],
    ['right', '0px', '12px'],
  ] as const)('positions tooltip for %s', (pos, top, left) => {
    const fixture = setup({ pos });
    fixture.nativeElement.querySelector('button').dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    const tooltip = document.querySelector<HTMLElement>('.k-tooltip-popover')!;
    expect(tooltip.style.top).toBe(top);
    expect(tooltip.style.left).toBe(left);
  });
});
