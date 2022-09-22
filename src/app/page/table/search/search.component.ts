import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { PageState } from 'src/app/types/page.state';
import { loadPage, search } from '../table.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public value: string = '';

  constructor(
    private store: Store<{ table: PageState<NetflixTitle> }>,
  ) {}

  clear() {
    // reset search state to default.
    this.value = '';
    this.store.dispatch(search({ search: '' }));
  }

  onEnter() {
    this.store.dispatch(search({ search: this.value }));
  }
}
