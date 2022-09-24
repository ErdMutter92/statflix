import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { columnSort, loadPage, pageChange, search } from './table.actions';
import { Store } from '@ngrx/store';
import { PageState } from 'src/app/types/page.state';
import { selectCurrentPage, selectDirectors, selectDisplayedColumns, selectListedIn, selectPageSize, selectRatings, selectReleaseYear, selectShowSettings, selectTotalCount, selectTypes } from './table.selectors';
import { PageEvent } from '@angular/material/paginator';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { Sort } from 'src/app/types/sort.interface';
import { ActionableTable } from 'src/app/types/actionable-table.interface';

/**
 * This supplies the Material Table with the current set of data needed
 * to display to the user. This particular datasource is deligating it's
 * duties to the redux store and acts as a service between the two.
 */
@Injectable()
export class TableDataSource implements DataSource<NetflixTitle>, ActionableTable<NetflixTitle> {
  public readonly items = this.store.select(selectCurrentPage);
  public readonly pageSize = this.store.select(selectPageSize);
  public readonly length = this.store.select(selectTotalCount);
  public readonly displayedColumns = this.store.select(selectDisplayedColumns);

  public readonly showSettings = this.store.select(selectShowSettings);

  public readonly types = this.store.select(selectTypes);
  public readonly directors = this.store.select(selectDirectors);
  public readonly releaseYear = this.store.select(selectReleaseYear);
  public readonly ratings = this.store.select(selectRatings);
  public readonly listedIn = this.store.select(selectListedIn);

  constructor(private store: Store) {}

  connect(collectionViewer: CollectionViewer): Observable<NetflixTitle[]> {
    return this.items;
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  /**
   *
   * @param index (default: 0)
   */
  loadPage(index: number = 0) {
    this.store.dispatch(loadPage({ page: index }));
  }

  /**
   * This forwards the event from the paginator to the reducer where we
   * extract the pageIndex and the pageSize to determine the next state.
   * @param event PageEvent
   */
  paginate(event: PageEvent) {
    this.store.dispatch(pageChange(event));
  }

  sort(event: Sort) {
    this.store.dispatch(columnSort(event));
  }

  search(contents: string) {
    this.store.dispatch(search({ search: contents }));
  }
}
