import { createSelector } from '@ngrx/store';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { PageState } from 'src/app/types/page.state';
import { sort as Sort, ISortBy } from 'fast-sort';

export const dashboardFeature = (state: { dashboard: PageState<NetflixTitle> }) => state.dashboard;

/**
 * Current set of items for a page
 */
export const selectCurrentPage = createSelector(
    dashboardFeature,
    ({ items, page, pageSize, sort }) => {
        let state = items.slice(0); // get a copy of the array
        const start = page * pageSize;
        const end = start + pageSize;

        const propertyName = sort?.active as ISortBy<NetflixTitle>;
        if (sort?.direction === 'asc') {
            state = Sort(state).asc(propertyName);
        } else if (sort?.direction === 'desc') {
            state = Sort(state).desc(propertyName);
        }
        
        return state.slice(start, end);
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