import {
  Component,
  DestroyRef,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
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
  #anchorElement = signal<HTMLElement | null>(null);
  #destroyRef = inject(DestroyRef);
  #cleanup?: () => void;

  ngOnInit() {
    const el = this.#elementRef.nativeElement;
    const parent = el.parentElement;
    if (!parent) return;

    this.#anchorElement.set(parent);

    const popoverId = `k-menu-${crypto.randomUUID()}`;
    el.id = popoverId;
    const anchorName = `--anchor-${popoverId}`;
    (parent.style as any)['anchorName'] = anchorName;
    (el.style as any)['positionAnchor'] = anchorName;

    const show = () => this.#showPopover();
    const hide = () => this.#hidePopover();
    parent.addEventListener('mouseenter', show);
    parent.addEventListener('focus', show);
    parent.addEventListener('mouseleave', hide);
    parent.addEventListener('blur', hide);
    el.addEventListener('mouseleave', hide);
    this.#cleanup = () => {
      parent.removeEventListener('mouseenter', show);
      parent.removeEventListener('focus', show);
      parent.removeEventListener('mouseleave', hide);
      parent.removeEventListener('blur', hide);
      el.removeEventListener('mouseleave', hide);
    };
    this.#destroyRef.onDestroy(() => this.#cleanup?.());
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

  ngOnDestroy() {
    this.#cleanup?.();
  }
}
