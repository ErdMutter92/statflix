import { createReducer, on } from '@ngrx/store';
import { columnSort, columnsVisible, loadPage, pageChange, search } from './table.actions';
import { PageState } from 'src/app/types/page.state';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { datasource } from './table.data';

export const FEATURE_NAME = 'table';

const initalState: PageState<NetflixTitle> = {
  displayedColumns: ['type', 'title', 'director', 'release_year', 'rating', 'duration', 'listed_in'],
  pageSize: 10,
  page: 1,
  items: datasource,
  search: '',
};

export const tableReducer = createReducer(
  initalState,
  on(loadPage, (state, { page }): PageState<NetflixTitle> => ({ ...state, page })),
  on(pageChange, (state, { pageIndex: page, pageSize }): PageState<NetflixTitle> => ({ ...state, page, pageSize })),
  on(columnSort, (state, sort): PageState<NetflixTitle> => ({ ...state, sort, page: 0 })),
  on(search, (state, { search }): PageState<NetflixTitle> => ({ ...state, search, page: 0 })),
  on(columnsVisible, (state, { displayedColumns }): PageState<NetflixTitle> => ({ ...state, displayedColumns }))
);
