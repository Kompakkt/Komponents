import {
  AfterViewInit,
  Component,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  ViewContainerRef,
  inject,
  input,
  signal,
  OnDestroy,
  OnInit,
} from '@angular/core';

type TooltipPosition = 'above' | 'below' | 'left' | 'right';

@Component({
  selector: 'k-tooltip',
  template: '{{ text() }}',
  standalone: true,
  styles: [
    `
      :host {
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

        /* Popover API animations */
        opacity: 0;
        transition:
          opacity 0.2s ease-in-out,
          display 0.2s ease-in-out allow-discrete;

        &:popover-open {
          opacity: 1;
        }

        @starting-style {
          &:popover-open {
            opacity: 0;
          }
        }
      }
    `,
  ],
})
export class TooltipComponent implements OnInit {
  text = signal<string>('');
  position = signal<TooltipPosition>('above');
  padding = signal<number>(12);

  #elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  #anchorElement: HTMLElement | null = null;
  #popoverId = `tooltip-${Math.random().toString(36).substring(2, 11)}`;

  ngOnInit(): void {
    const el = this.#elRef.nativeElement;
    el.setAttribute('popover', 'manual');
    el.id = this.#popoverId;
  }

  setAnchor(anchor: HTMLElement): void {
    this.#anchorElement = anchor;
  }

  show(): void {
    const el = this.#elRef.nativeElement;
    if (!this.#anchorElement || !this.text()) return;

    el.showPopover();
    this.#updatePosition();
  }

  hide(): void {
    const el = this.#elRef.nativeElement;
    try {
      el.hidePopover();
    } catch {
      // Popover might already be hidden
    }
  }

  #updatePosition(): void {
    if (!this.#anchorElement) return;

    const el = this.#elRef.nativeElement;
    const anchorRect = this.#anchorElement.getBoundingClientRect();
    const tooltipRect = el.getBoundingClientRect();
    const pos = this.position();
    const pad = this.padding();

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

    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
  }
}

@Directive({
  selector: '[tooltip]',
  standalone: true,
})
export class TooltipDirective implements AfterViewInit, OnDestroy {
  tooltip = input.required<string>();
  tooltipPosition = input<TooltipPosition>('above');
  tooltipPadding = input(12);

  #elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  #viewContainerRef = inject(ViewContainerRef);
  #tooltipComponentRef?: ComponentRef<TooltipComponent>;

  ngAfterViewInit(): void {
    this.#tooltipComponentRef = this.#viewContainerRef.createComponent(TooltipComponent);
    this.#tooltipComponentRef.instance.setAnchor(this.#elRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.#tooltipComponentRef?.destroy();
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.#tooltipComponentRef) return;

    const instance = this.#tooltipComponentRef.instance;
    instance.text.set(this.tooltip());
    instance.position.set(this.tooltipPosition());
    instance.padding.set(this.tooltipPadding());
    instance.show();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.#tooltipComponentRef?.instance.hide();
  }
}
