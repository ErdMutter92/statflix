import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectNumbersByRating } from '../table/table.selectors';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
})
export class GraphsComponent {
  public single = this.store.select(selectNumbersByRating);
  // public single = [
  //   {
  //     "name": "Germany",
  //     "value": 8940000
  //   },
  //   {
  //     "name": "USA",
  //     "value": 5000000
  //   },
  //   {
  //     "name": "France",
  //     "value": 7200000
  //   },
  //   {
  //     "name": "UK",
  //     "value": 5200000
  //   },
  //   {
  //     "name": "Italy",
  //     "value": 7700000
  //   },
  //   {
  //     "name": "Spain",
  //     "value": 4300000
  //   }
  // ];

  constructor(private store: Store) {}
}
