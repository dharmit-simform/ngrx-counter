import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit {
  counter: number = 0;
  counter$: Observable<CounterState>

  constructor(
    private store: Store<{ counter: CounterState }>
  ) { }

  ngOnInit(): void {
    this.counter$ = this.store.select('counter');
  }
}
