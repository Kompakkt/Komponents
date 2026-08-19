import { Component, OnDestroy, signal } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import {
  InputComponent,
  LabelledCheckboxComponent,
  SelectComponent,
  MenuOptionComponent,
  SlideToggleComponent,
  SliderComponent,
  TextareaComponent,
} from '@kompakkt/komponents';

@Component({
  selector: 'example-external-state',
  standalone: true,
  imports: [
    InputComponent,
    LabelledCheckboxComponent,
    SelectComponent,
    MenuOptionComponent,
    SlideToggleComponent,
    SliderComponent,
    TextareaComponent,
  ],
  templateUrl: './external-state.component.html',
  styleUrl: './external-state.component.scss',
})
export class ExampleExternalStateComponent implements OnDestroy {
  readonly checked = signal(false);
  readonly toggle = signal(false);
  readonly volume = signal(40);
  readonly bio = signal('');
  readonly tag = signal('a');
  readonly label = signal('external');

  readonly ticks = signal(0);
  readonly tags = ['a', 'b', 'c'];
  private sub: Subscription;

  constructor() {
    this.sub = interval(1000).subscribe(() => {
      this.ticks.update(t => t + 1);
      this.checked.update(v => !v);
      this.toggle.update(v => !v);
      this.volume.update(v => (v + 5) % 101);
      this.tag.update(t => this.tags[(this.tags.indexOf(t) + 1) % this.tags.length]);
      this.label.set(`auto-${this.ticks()}`);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
