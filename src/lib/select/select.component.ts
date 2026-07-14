import {
  AfterContentInit,
  booleanAttribute,
  Component,
  ContentChildren,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  QueryList,
  signal,
  viewChild,
} from '@angular/core';

import { MenuOptionComponent } from '../menu-option/menu-option.component';
import { setupMarquee } from '../shared/marquee';

@Component({
  selector: 'k-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent implements AfterContentInit, OnDestroy {
  label = input<string>();
  placeholder = input<string>('Select...');
  disabled = input(false, { transform: booleanAttribute });
  startingValue = input<string>();

  value = signal<string>('');
  valueChanged = output<string>();

  open = signal(false);
  triggerText = signal<string>('');

  @ContentChildren(MenuOptionComponent) options!: QueryList<MenuOptionComponent>;

  dropdown = viewChild<ElementRef<HTMLElement>>('dropdown');
  triggerTextEl = viewChild<ElementRef<HTMLElement>>('triggerTextEl');

  #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  #optionsSub?: { unsubscribe(): void };

  constructor() {
    effect(() => {
      this.valueChanged.emit(this.value());
    });
    effect(() => {
      const sv = this.startingValue();
      if (sv !== undefined) this.#applyValue(sv);
    });
    effect(onCleanup => {
      void this.triggerText();
      const span = this.triggerTextEl()?.nativeElement;
      if (!span) return;
      onCleanup(setupMarquee(span));
    });
  }

  ngAfterContentInit(): void {
    this.#setupAnchor();
    this.#syncFromStartingValue();
    this.#watchOptions();
  }

  ngOnDestroy(): void {
    this.#optionsSub?.unsubscribe();
  }

  togglePopover(): void {
    if (this.disabled()) return;
    this.dropdown()?.nativeElement.togglePopover();
  }

  onPopoverToggle(event: Event): void {
    this.open.set((event as ToggleEvent).newState === 'open');
  }

  #selectValue(optionValue: string): void {
    const option = this.options.find(o => o.value() === optionValue);
    if (!option || option.isDisabled) return;
    this.#applyValue(optionValue);
    this.dropdown()?.nativeElement.hidePopover();
  }

  #applyValue(optionValue: string): void {
    if (!this.options?.length) return;
    const option = this.options.find(o => o.value() === optionValue);
    if (!option || option.isDisabled) return;
    this.value.set(optionValue);
    this.triggerText.set(option.elementRef.nativeElement.textContent?.trim() ?? '');
    this.options.forEach(o => (o.selected = o.value() === optionValue));
  }

  onDropdownClick(event: Event): void {
    const target = event.target as HTMLElement;
    const optionEl = target.closest('k-menu-option');
    if (!optionEl) return;
    const option = this.options.find(o => o.elementRef.nativeElement === optionEl);
    if (option && !option.isDisabled && option.value()) {
      this.#selectValue(option.value()!);
    }
  }

  #setupAnchor(): void {
    const trigger = this.#elementRef.nativeElement.querySelector('.trigger') as HTMLElement;
    const dd = this.dropdown()?.nativeElement;
    if (!dd) return;
    const id = `k-select-${crypto.randomUUID()}`;
    dd.id = id;
    const anchorName = `--anchor-${id}`;
    (trigger.style as unknown as Record<string, string>)['anchorName'] = anchorName;
    (dd.style as unknown as Record<string, string>)['positionAnchor'] = anchorName;
  }

  #syncFromStartingValue(): void {
    const sv = this.startingValue();
    if (!sv) return;
    this.#applyValue(sv);
  }

  #watchOptions(): void {
    this.#optionsSub = this.options.changes.subscribe(() => {
      this.#syncFromStartingValue();
    });
  }
}
