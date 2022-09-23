import { createReducer, on } from '@ngrx/store';
import { addFilterColumn, columnSort, columnsVisible, loadPage, pageChange, removeFilterColumn, search } from './table.actions';
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
  filters: {},
};

export const tableReducer = createReducer(
  initalState,
  on(loadPage, (state, { page }): PageState<NetflixTitle> => ({ ...state, page })),
  on(pageChange, (state, { pageIndex: page, pageSize }): PageState<NetflixTitle> => ({ ...state, page, pageSize })),
  on(columnSort, (state, sort): PageState<NetflixTitle> => ({ ...state, sort, page: 0 })),
  on(search, (state, { search }): PageState<NetflixTitle> => ({ ...state, search, page: 0 })),
  on(columnsVisible, (state, { displayedColumns }): PageState<NetflixTitle> => ({ ...state, displayedColumns })),
  on(addFilterColumn, (state, { columnName, value }): PageState<NetflixTitle> => ({...state, filters: { ...state.filters, [columnName]: value } })),
  on(removeFilterColumn, (state, { columnName }): PageState<NetflixTitle> => {
    /**
     * NOTE: If we consider the state that is passed in as current state,
     * and the value being returned as next state. This removes the
     * property with the key of ${columnName} without mutating the current
     * state. It also creates a new object with all the other properties in
     * it, so an additional spread operator is not needed.
     */
    const { [columnName]: omit, ...filters } = state.filters;
    return {...state, filters };
  }),
);
