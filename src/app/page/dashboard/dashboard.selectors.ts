import { createSelector } from '@ngrx/store';
import { NetflixTitle } from 'src/app/types/netflixtitle.interface';
import { PageState } from 'src/app/types/page.state';

export const dashboardFeature = (state: { dashboard: PageState<NetflixTitle> }) => state.dashboard;

/**
 * Current set of items for a page
 */
export const selectCurrentPage = createSelector(
    dashboardFeature,
    ({ items, page, pageSize }) => {
        const start = page * pageSize;
        const end = start + pageSize;

        return items.slice(start, end);
    },
)

/**
 * Number of items in each page
 */
export const selectPageSize = createSelector(
    dashboardFeature,
    ({ pageSize }) => pageSize,
)

/**
 * Total number of items in the dataset
 */
export const selectTotalCount = createSelector(
    dashboardFeature,
    ({ items }) => items.length
)