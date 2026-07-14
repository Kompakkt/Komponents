import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';

type TooltipPosition = 'above' | 'below' | 'left' | 'right';

@Directive({
  selector: '[tooltip]',
  standalone: true,
})
export class TooltipDirective implements AfterViewInit, OnDestroy {
  tooltip = input.required<string>();
  tooltipPosition = input<TooltipPosition>('above');
  tooltipPadding = input(12);

  #elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  #tooltipEl?: HTMLElement;

  ngAfterViewInit(): void {
    const tip = document.createElement('div');
    tip.textContent = this.tooltip();
    tip.setAttribute('popover', 'manual');
    tip.id = `tooltip-${crypto.randomUUID()}`;
    tip.className = 'k-tooltip-popover';
    tip.style.cssText = `
      margin: 0;
      padding: 5px 10px;
      border: none;
      background-color: var(--color-bg-transparent);
      color: #fff;
      border-radius: 4px;
      font-size: var(--font-size-small);
      text-align: center;
      pointer-events: none;
      position: fixed;
      inset: unset;
      opacity: 0;
      transition: opacity 0.2s ease-in-out, display 0.2s ease-in-out allow-discrete;
    `;
    document.body.appendChild(tip);
    this.#tooltipEl = tip;
  }

  @HostListener('mouseenter')
  show(): void {
    const tip = this.#tooltipEl;
    if (!tip || !this.tooltip()) return;
    tip.textContent = this.tooltip();
    tip.style.opacity = '1';
    tip.showPopover();
    this.#updatePosition();
  }

  @HostListener('mouseleave')
  hide(): void {
    const tip = this.#tooltipEl;
    if (!tip) return;
    tip.style.opacity = '0';
    tip.hidePopover();
  }

  #updatePosition(): void {
    const tip = this.#tooltipEl;
    const anchor = this.#elRef.nativeElement;
    if (!tip || !anchor) return;

    const anchorRect = anchor.getBoundingClientRect();
    const tooltipRect = tip.getBoundingClientRect();
    const pos = this.tooltipPosition();
    const pad = this.tooltipPadding();

    let top: number;
    let left: number;

    switch (pos) {
      case 'above':
        top = anchorRect.top - tooltipRect.height - pad;
        left = anchorRect.left + (anchorRect.width - tooltipRect.width) / 2;
        break;
      case 'below':
        top = anchorRect.bottom + pad;
        left = anchorRect.left + (anchorRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = anchorRect.top + (anchorRect.height - tooltipRect.height) / 2;
        left = anchorRect.left - tooltipRect.width - pad;
        break;
      case 'right':
        top = anchorRect.top + (anchorRect.height - tooltipRect.height) / 2;
        left = anchorRect.right + pad;
        break;
    }

    tip.style.top = `${top}px`;
    tip.style.left = `${left}px`;
  }

  ngOnDestroy(): void {
    this.#tooltipEl?.remove();
  }
}
