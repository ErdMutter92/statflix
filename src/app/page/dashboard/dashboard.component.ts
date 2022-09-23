import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectNumbersByRating } from '../table/table.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public ratings = this.store.select(selectNumbersByRating);
  
  constructor(private store: Store) {}
}
