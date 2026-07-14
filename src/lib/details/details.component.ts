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
import { setupMarquee } from '../shared/marquee';

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
