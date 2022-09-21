import { createReducer, on } from '@ngrx/store';
import { columnSort, loadPage, pageChange } from './table.actions';
import { PageState } from 'src/app/types/page.state';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { datasource } from './table.data';

export const FEATURE_NAME = 'table';

const initalState: PageState<NetflixTitle> = {
    pageSize: 10,
    page: 1,
    items: datasource
};

export const tableReducer = createReducer(
    initalState,
    on(loadPage, (state, { page }) => ({ ...state, page })),
    on(pageChange, (state, { pageIndex: page, pageSize}) => ({ ...state, page, pageSize })),
    on(columnSort, (state, sort) => ({ ...state, sort })),
);