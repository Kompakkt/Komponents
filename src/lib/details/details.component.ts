import {
  AfterViewInit,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'k-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements AfterViewInit {
  title = input.required<string>();
  startCollapsed = input(false);
  alwaysExpanded = input(false);
  marquee = input(false);
  expanded = signal(true);
  gap = input(8);

  titleEl = viewChild<ElementRef<HTMLSpanElement>>('titleEl');

  constructor() {
    const destroyRef = inject(DestroyRef);

    effect(() => {
      void this.title();
      const enabled = this.marquee();
      const span = this.titleEl()?.nativeElement;
      if (!enabled || !span) return;

      const update = () => {
        const viewport = span.parentElement;
        if (!viewport) return;
        const distance = Math.max(span.scrollWidth - viewport.clientWidth, 0);
        span.style.setProperty('--marquee-distance', `${distance}px`);
        span.style.setProperty('--marquee-duration', `${distance * 0.02 + 1}s`);
      };

      update();

      const ro = new ResizeObserver(update);
      ro.observe(span.parentElement ?? span);
      destroyRef.onDestroy(() => ro.disconnect());
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
