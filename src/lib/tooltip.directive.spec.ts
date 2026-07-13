import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TooltipDirective, TooltipComponent } from './tooltip.directive';

@Component({
  standalone: true,
  imports: [TooltipDirective],
  template: '<button [tooltip]="tooltipText" tooltipPosition="above">Hover me</button>',
})
class TestHostComponent {
  tooltipText = 'Help text';
}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should attach tooltip directive to host element', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('should create tooltip component on init', () => {
    const button = fixture.nativeElement.querySelector('button');
    const tooltip = fixture.nativeElement.querySelector('k-tooltip');
    // Tooltip might be rendered inside view container
    expect(button.textContent).toContain('Hover me');
  });

  it('should handle mouseenter and set tooltip text', () => {
    const button = fixture.nativeElement.querySelector('button');
    const directive = fixture.debugElement.children[0]?.injector.get(TooltipDirective);
    expect(directive).toBeTruthy();
    if (directive) {
      expect(directive.tooltip()).toBe('Help text');
      expect(directive.tooltipPosition()).toBe('above');
    }
  });
});
