import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { customIncrement } from '../state/counter.action';

@Component({
  selector: 'app-custom-input-counter',
  templateUrl: './custom-input-counter.component.html',
  styleUrls: ['./custom-input-counter.component.css']
})
export class CustomInputCounterComponent {
  value: number;

  constructor(
    private store: Store<{ counter: CounterState }>
  ) { }

  onAdd() {
    if (this.value) {
      this.store.dispatch(customIncrement({ value: this.value }));
      this.value = undefined;
    }
  }
}
