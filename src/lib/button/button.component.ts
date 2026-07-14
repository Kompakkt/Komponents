import {
  booleanAttribute,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  computed,
  inject,
  input,
} from '@angular/core';

const getColor = (color?: ButtonColor) => {
  if (!color) return 'currentColor';

  if (color.startsWith('rgb') || color.startsWith('#') || color === 'transparent') {
    return color;
  }

  if (color.startsWith('--color')) {
    return `var(${color}, currentColor)`;
  }

  return `var(--color-${color}, currentColor)`;
};

type ButtonStyle = 'solid' | 'outlined';
type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'warn'
  | 'transparent'
  | `--color-${string}`
  | `rgb${string}`
  | `#${string}`;
type ButtonType = `${ButtonStyle}-${ButtonColor}`;

@Component({
  selector: 'k-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  type = input<ButtonType>('solid-transparent');
  disabled = input(false, { transform: booleanAttribute });
  iconButton = input<string | undefined>(undefined, { alias: 'icon-button' });
  iconSize = input<number | undefined>(undefined, { alias: 'icon-size' });
  fullWidth = input<string | undefined>(undefined, { alias: 'full-width' });

  #splitType = computed(() => {
    const type = this.type();
    const style = (type.startsWith('outlined') ? 'outlined' : 'solid') as ButtonStyle;
    const rest = type.slice(style.length);
    const color = (rest.startsWith('--') ? rest : rest.slice(1)) as ButtonColor;
    return [style, color] as const;
  });
  #computedStyle = computed(() => this.#splitType()[0]);
  #computedColor = computed(() => getColor(this.#splitType()[1]));

  @HostBinding('class.icon-button')
  get isIconButton() {
    return this.iconButton() !== undefined;
  }

  @HostBinding('style.--icon-size.px')
  get hostIconSize() {
    return this.iconSize() !== undefined ? this.iconSize() : undefined;
  }

  @HostBinding('class.full-width')
  get isFullWidth() {
    return this.fullWidth() !== undefined;
  }

  @HostBinding('class.solid')
  get isSolid() {
    return this.#computedStyle() === 'solid';
  }

  @HostBinding('class.outlined')
  get isOutlined() {
    return this.#computedStyle() === 'outlined';
  }

  @HostBinding('class.disabled')
  get isDisabled() {
    return this.disabled();
  }

  @HostBinding('attr.role')
  get role() {
    return 'button';
  }

  @HostBinding('attr.tabindex')
  get tabindex() {
    return this.disabled() ? -1 : 0;
  }

  @HostBinding('attr.aria-disabled')
  get ariaDisabled() {
    return this.disabled() ? true : null;
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (this.disabled() || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    this.#hostElement?.click();
  }

  @HostBinding('style.--color')
  get hostColor() {
    return this.#computedColor();
  }

  #hostElement = inject(ElementRef<HTMLElement>).nativeElement;
}
