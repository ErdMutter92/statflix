import { createSelector, createFeatureSelector } from '@ngrx/store';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { PageState } from 'src/app/types/page.state';
import { sort as Sort, ISortBy } from 'fast-sort';
import Fuse from 'fuse.js';

const searchOptions = { minMatchCharLength: 1, threshold: 0.05 };

export const selectTableFeature = createFeatureSelector<PageState<NetflixTitle>>('table');

/**
 * Current set of items for a page
 *
 * TODO: This selector is really heavy from overloading it with
 * search, sort, and filter. This should be refactored out.
 */
export const selectCurrentPage = createSelector(selectTableFeature, ({ items, page, pageSize, sort, search }) => {
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
    const fuse = new Fuse(state, { ...searchOptions, keys: Object.keys(items[0]) });
    state = fuse.search(search).map((result) => result.item);
  }

  return state.slice(start, end);
});

/**
 * Number of items in each page
 */
export const selectPageSize = createSelector(selectTableFeature, ({ pageSize }) => pageSize);

/**
 * Total number of items in the dataset
 */
export const selectTotalCount = createSelector(selectTableFeature, ({ items, search }) => {
  let state = items.slice(0); // get a copy of the array

  if (search) {
    const fuse = new Fuse(state, { ...searchOptions, keys: Object.keys(items[0]) });
    state = fuse.search(search).map((result) => result.item);
  }

  return state.length;
});

/**
 * Current search value
 */
export const selectSearchTerm = createSelector(selectTableFeature, ({ search }) => search);

/**
 * Displayed columns
 */
export const selectDisplayedColumns = createSelector(selectTableFeature, ({ displayedColumns }) => displayedColumns);

/**
 * A graph dataset of the number of shows in each rating.
 */
export const selectNumbersByRating = createSelector(selectTableFeature, ({ items }) => {
  const results = items.reduce((results: { [countryName: string]: number }, item, index) => {
    const key = item.rating ? item.rating : 'Missing Raiting';
    results[key] = (results[key] || 0) + 1;

    return results;
  }, {});

  return Object.keys(results).map((key) => ({ name: key, value: results[key] }));
});

/**
 * A graph dataset of the top 15 release years with the most releases in them.
 */
export const selectNumbersByReleaseYear = createSelector(selectTableFeature, ({ items }) => {
  type result = { [countryName: string]: number };
  const results = items.reduce((results: result, item, index) => {
    const key = item.release_year ? item.release_year : 'Missing Release Year';
    results[key] = (results[key] || 0) + 1;

    return results;
  }, {});

  return Object.keys(results)
    .map((key) => ({ name: key, value: results[key] }))
    .sort((a: any, b: any) => {
      // by value to get top spots
      if (a.value < b.value) return 1;
      if (a.value > b.value) return -1;
      return 0;
    })
    .slice(0, 15)
    .sort((a: any, b: any) => {
      // by year to place in order
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    });
});
