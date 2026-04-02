import {
  Component,
  ElementRef,
  HostBinding,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { MenuOptionComponent } from '../menu-option/menu-option.component';

@Component({
  selector: 'k-menu',
  standalone: true,
  imports: [MenuOptionComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  host: {
    '[attr.popover]': '"auto"',
  },
})
export class MenuComponent implements OnInit, OnDestroy {
  label = input<string>();
  width = input<string>();

  @HostBinding('style.--width') get widthStyle() {
    return this.width() ? `${this.width()}px` : undefined;
  }

  #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  #subscriptions = new Array<Subscription>();
  #anchorElement = signal<HTMLElement | null>(null);

  ngOnInit() {
    const parentElement = this.#elementRef.nativeElement.parentElement;
    if (!parentElement) return;

    this.#anchorElement.set(parentElement);

    // Generate unique ID for anchor positioning
    const popoverId = `k-menu-${crypto.randomUUID()}`;
    this.#elementRef.nativeElement.id = popoverId;

    // Set up anchor positioning via CSS anchor
    // Using type assertion as CSS Anchor Positioning is not yet in TypeScript's CSSStyleDeclaration
    const anchorName = `--anchor-${popoverId}`;
    (parentElement.style as unknown as Record<string, string>)['anchorName'] = anchorName;
    (this.#elementRef.nativeElement.style as unknown as Record<string, string>)['positionAnchor'] =
      anchorName;

    this.#subscriptions.push(
      fromEvent(parentElement, 'mouseenter').subscribe(() => {
        this.#showPopover();
      }),
      fromEvent(parentElement, 'focus').subscribe(() => {
        this.#showPopover();
      }),
      fromEvent(parentElement, 'mouseleave').subscribe((event: Event) => {
        const mouseEvent = event as MouseEvent;
        const relatedTarget = mouseEvent.relatedTarget as HTMLElement | null;
        // Don't hide if moving to the popover itself
        if (relatedTarget && this.#elementRef.nativeElement.contains(relatedTarget)) {
          return;
        }
        this.#hidePopover();
      }),
      fromEvent(parentElement, 'blur').subscribe(() => {
        this.#hidePopover();
      }),
      // Handle mouse leaving the popover back to parent or elsewhere
      fromEvent(this.#elementRef.nativeElement, 'mouseleave').subscribe((event: Event) => {
        const mouseEvent = event as MouseEvent;
        const relatedTarget = mouseEvent.relatedTarget as HTMLElement | null;
        // Don't hide if moving back to the anchor element
        if (relatedTarget && parentElement.contains(relatedTarget)) {
          return;
        }
        this.#hidePopover();
      }),
    );
  }

  #showPopover() {
    const el = this.#elementRef.nativeElement;
    if (!el.matches(':popover-open')) {
      el.showPopover();
    }
  }

  #hidePopover() {
    const el = this.#elementRef.nativeElement;
    if (el.matches(':popover-open')) {
      el.hidePopover();
    }
  }

  ngOnDestroy(): void {
    this.#subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
