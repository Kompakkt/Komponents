import {
  AfterContentInit,
  booleanAttribute,
  Component,
  ContentChildren,
  effect,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  output,
  QueryList,
  signal,
  viewChild,
} from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';

import { MenuOptionComponent } from '../menu-option/menu-option.component';
import { setupMarquee } from '../shared/marquee';

@Component({
  selector: 'k-select',
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  host: { '[class]': '"size-" + size()' },
})
export class SelectComponent implements FormValueControl<string>, AfterContentInit, OnDestroy {
  label = input<string>();
  size = input<'sm' | 'md' | 'lg'>('md');
  placeholder = input<string>('Select...');
  disabled = input(false, { transform: booleanAttribute });
  required = input(false, { transform: booleanAttribute });

  value = model<string>('');

  invalid = input(false);
  errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  // Defaults to true so standalone consumers passing [invalid] see the state
  // immediately; the [formField] directive writes false on init when bound.
  touched = input(true);
  touch = output<void>();

  open = signal(false);
  triggerText = signal<string>('');

  @ContentChildren(MenuOptionComponent) options!: QueryList<MenuOptionComponent>;

  dropdown = viewChild<ElementRef<HTMLElement>>('dropdown');
  triggerTextEl = viewChild<ElementRef<HTMLElement>>('triggerTextEl');

  #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  #optionsSub?: { unsubscribe(): void };

  constructor() {
    effect(() => {
      const value = this.value();
      if (!value) return;
      this.#syncFromBoundValue(value);
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
    this.#syncFromBoundValue(this.value());
    this.#watchOptions();
  }

  ngOnDestroy(): void {
    this.#optionsSub?.unsubscribe();
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

  #syncFromBoundValue(value: string): void {
    if (!value) return;
    this.#applyValue(value);
  }

  #watchOptions(): void {
    this.#optionsSub = this.options.changes.subscribe(() => {
      this.#syncFromBoundValue(this.value());
    });
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
    trigger.setAttribute('popovertarget', id);
    const anchorName = `--anchor-${id}`;
    (trigger.style as unknown as Record<string, string>)['anchorName'] = anchorName;
    (dd.style as unknown as Record<string, string>)['positionAnchor'] = anchorName;
  }
}
