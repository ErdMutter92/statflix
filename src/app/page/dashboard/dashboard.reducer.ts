import { createReducer, on } from '@ngrx/store';
import * as DashboardActions from './dashboard.actions';
import { PageState } from 'src/app/types/page.state';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { datasource } from './dashboard.data';

const initalState: PageState<NetflixTitle> = {
    pageSize: 10,
    page: 1,
    items: datasource
};

export const dashboardReducer = createReducer(
    initalState,
    on(DashboardActions.loadPage, (state, { page }) => ({ ...state, page })),
    on(DashboardActions.pageChange, (state, { pageIndex: page, pageSize}) => {
        return { ...state, page, pageSize };
    }),
    on(DashboardActions.columnSort, (state, sort) => {
        return { ...state, sort };
    }),
);