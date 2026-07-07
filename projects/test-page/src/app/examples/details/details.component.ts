import { Component, signal } from '@angular/core';
import { DetailsComponent } from '@kompakkt/komponents';

@Component({
  selector: 'example-details',
  standalone: true,
  imports: [DetailsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class ExampleDetailsComponent {
  stressCount = signal(0);

  setStressCount(count: number) {
    this.stressCount.set(count);
  }
}
