import { createSelector } from '@ngrx/store';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { PageState } from 'src/app/types/page.state';
import { sort as Sort, ISortBy } from 'fast-sort';
import Fuse from 'fuse.js';

const searchOptions = { minMatchCharLength: 1, threshold: 0.05 };

export const tableFeature = (state: { table: PageState<NetflixTitle> }) => state.table;

/**
 * Current set of items for a page
 * 
 * TODO: This selector is really heavy from overloading it with
 * search, sort, and filter. This should be refactored out.
 */
export const selectCurrentPage = createSelector(
    tableFeature,
    ({ items, page, pageSize, sort, search, displayedColumns }) => {
        let state = items.slice(0); // get a copy of the array
        const start = page * pageSize;
        const end = start + pageSize;

        const propertyName = sort?.active as ISortBy<NetflixTitle>;
        if (sort?.direction === 'asc') {
            state = Sort(state).asc(propertyName);
        } else if (sort?.direction === 'desc') {
            state = Sort(state).desc(propertyName);
        }

        if (search) {
            const fuse = new Fuse(state, { ...searchOptions, keys: displayedColumns });
            state = fuse.search(search).map(result => result.item);
        }

        return state.slice(start, end);
    },
)

/**
 * Number of items in each page
 */
export const selectPageSize = createSelector(
    tableFeature,
    ({ pageSize }) => pageSize,
)

/**
 * Total number of items in the dataset
 */
export const selectTotalCount = createSelector(
    tableFeature,
    ({ items, search, displayedColumns }) => {
        let state = items.slice(0); // get a copy of the array

        if (search) {
            const fuse = new Fuse(state, { ...searchOptions, keys: displayedColumns });
            state = fuse.search(search).map(result => result.item);
        }

        return state.length;
    }
)