import { Component, HostBinding, OnDestroy, effect, input, output, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subscription, skip } from 'rxjs';

@Component({
  selector: 'k-slide-toggle',
  standalone: true,
  imports: [],
  templateUrl: './slide-toggle.component.html',
  styleUrl: './slide-toggle.component.scss',
})
export class SlideToggleComponent implements OnDestroy {
  label = input.required<string>();
  startingValue = input<boolean>(false);
  checkedChange = output<boolean>();
  checked = signal(false);
  #sync = effect(() => this.checked.set(this.startingValue()));
  checked$ = toObservable(this.checked).pipe(skip(1));

  valueSubscription = this.checked$.subscribe(value => {
    this.checkedChange.emit(value);
  });

  ngOnDestroy(): void {
    this.valueSubscription?.unsubscribe();
  }

  toggle() {
    this.checked.update(value => !value);
  }

  @HostBinding('class.active')
  get active() {
    return this.checked();
  }
}
