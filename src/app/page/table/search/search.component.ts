import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { PageState } from 'src/app/types/page.state';
import { loadPage, search } from '../table.actions';
import { selectSearchTerm } from '../table.selectors';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input()
  public appearance: MatFormFieldAppearance = 'fill'
  
  public value: string = '';

  constructor(
    private store: Store<{ table: PageState<NetflixTitle> }>,
  ) {
    
  }

  ngOnInit() {
    // When the component initalizes set the current search value found
    // in the state store onto the component.
    this.store.select(selectSearchTerm).pipe(take(1)).subscribe((search) => {
      this.value = search;
    });
  }

  clear() {
    // reset search state to default.
    this.value = '';
    this.store.dispatch(search({ search: '' }));
  }

  onEnter() {
    this.store.dispatch(search({ search: this.value }));
  }
}
