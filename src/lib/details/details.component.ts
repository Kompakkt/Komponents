import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  model,
  viewChild,
} from '@angular/core';
import { setupMarquee } from '../shared/marquee';
import { KOMPONENTS_DEFAULTS, type BoxPadding } from '../shared/komponents-config';

const DEFAULT_PADDING: BoxPadding = {
  top: 0,
  left: 16,
  right: 16,
  bottom: 12,
}

@Component({
  selector: 'k-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  host: {
    '[class]': '"size-" + size()',
    '[style.--content-padding-left]': '__mergedContentPadding().left + "px"',
    '[style.--content-padding-right]': '__mergedContentPadding().right + "px"',
    '[style.--content-padding-top]': '__mergedContentPadding().top + "px"',
    '[style.--content-padding-bottom]': '__mergedContentPadding().bottom + "px"',
  },
})
export class DetailsComponent implements AfterViewInit {
  title = input.required<string>();
  size = input<'sm' | 'md' | 'lg'>('md');
  startCollapsed = input(false);
  alwaysExpanded = input(false);
  marquee = input(false);
  expanded = model(true);
  gap = input(8);
  contentPadding = input<Partial<BoxPadding>>({});
  readonly __config = inject(KOMPONENTS_DEFAULTS);
  readonly __mergedContentPadding = computed(() => ({
    ...DEFAULT_PADDING,
    ...this.__config.details?.contentPadding,
    ...this.contentPadding(),
  }));

  titleEl = viewChild<ElementRef<HTMLSpanElement>>('titleEl');

  constructor() {
    const destroyRef = inject(DestroyRef);
    effect(() => {
      void this.title();
      if (!this.marquee()) return;
      const span = this.titleEl()?.nativeElement;
      if (!span) return;
      destroyRef.onDestroy(setupMarquee(span));
    });
  }

  toggle() {
    if (!this.alwaysExpanded()) {
      this.expanded.set(!this.expanded());
    }
  }

  ngAfterViewInit(): void {
    if (this.alwaysExpanded()) {
      this.expanded.set(true);
    } else if (this.startCollapsed()) {
      this.expanded.set(false);
    }
  }
}
