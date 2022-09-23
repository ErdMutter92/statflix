import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectNumbersByRating, selectNumbersByReleaseYear } from '../table/table.selectors';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
})
export class GraphsComponent {
  public ratingsByNumbers = this.store.select(selectNumbersByRating);
  public releaseYearsByNumbers = this.store.select(selectNumbersByReleaseYear);

  constructor(private store: Store) {}
}
