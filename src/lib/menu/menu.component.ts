import {
  Component,
  DestroyRef,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  computed,
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
    '[style.--width]': 'widthStyle()',
    '[class.opened]': 'state() === "opened"',
  },
})
export class MenuComponent implements OnInit, OnDestroy {
  readonly label = input<string>();
  readonly width = input<string>();
  readonly widthStyle = computed(() => (this.width() ? `${this.width()}px` : undefined));
  readonly state = signal<'opened' | 'closed'>('closed');

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
    const hide = (e: Event) => this.#hidePopover(e);
    const onBeforeToggle = (e: Event) => {
      if ((e as ToggleEvent).newState === 'closed') {
        el.style.pointerEvents = 'none';
      }
    };
    const onTransitionEnd = (e: Event) => {
      if (e.target !== el) return;
      if (el.matches(':popover-open')) {
        el.style.pointerEvents = 'auto';
      } else {
        this.state.set('closed');
      }
    };

    parent.addEventListener('mouseenter', show);
    parent.addEventListener('focus', show);
    parent.addEventListener('mouseleave', hide);
    parent.addEventListener('blur', hide);
    el.addEventListener('mouseleave', hide);
    el.addEventListener('beforetoggle', onBeforeToggle);
    el.addEventListener('transitionend', onTransitionEnd);

    this.#cleanup = () => {
      parent.removeEventListener('mouseenter', show);
      parent.removeEventListener('focus', show);
      parent.removeEventListener('mouseleave', hide);
      parent.removeEventListener('blur', hide);
      el.removeEventListener('mouseleave', hide);
      el.removeEventListener('beforetoggle', onBeforeToggle);
      el.removeEventListener('transitionend', onTransitionEnd);
    };
    this.#destroyRef.onDestroy(() => this.#cleanup?.());
  }

  #showPopover() {
    const el = this.#elementRef.nativeElement;
    if (!el.matches(':popover-open')) {
      this.state.set('opened');
      el.style.pointerEvents = 'none';
      el.showPopover();
    }
  }

  #hidePopover(e: Event) {
    const el = this.#elementRef.nativeElement;
    const parent = el.parentElement;

    const to = (e as FocusEvent).relatedTarget as Node | null;
    if (parent && to && (to === parent || parent.contains(to))) {
      return;
    }
    if (e instanceof MouseEvent && el.contains(document.activeElement)) {
      return;
    }

    if (el.matches(':popover-open')) {
      el.hidePopover();
    }
  }

  ngOnDestroy() {
    this.#cleanup?.();
  }
}
