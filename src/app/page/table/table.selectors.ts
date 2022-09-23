import { createSelector, createFeatureSelector } from '@ngrx/store';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { ColumnFilters, PageState } from 'src/app/types/page.state';
import { sort as Sort, ISortBy } from 'fast-sort';
import Fuse from 'fuse.js';
import { SortDirection } from '@angular/material/sort';

const searchOptions = { minMatchCharLength: 1, threshold: 0.05 };

export function sortTableItems<type>(items: type[], propertyName: ISortBy<type>, direction: SortDirection | undefined) {
  if (direction === 'asc') {
    return Sort(items).asc(propertyName);
  } else if (direction === 'desc') {
    return Sort(items).desc(propertyName);
  }

  return items;
}

export function getNumbersByKey<type>(items: type[], propertyName: keyof type, missingLabel: string = 'Missing Value') {
  const results: { [propertyName: string]: number } = items.reduce((results: any, item, index) => {
    const key = item[propertyName] ? item[propertyName] : missingLabel;
    results[key] = (results[key] || 0) + 1;

    return results;
  }, {});

  return Object.keys(results).map((key) => ({ name: key, value: results[key] }));
}

export function filterTableItems(items: NetflixTitle[], filters: ColumnFilters) {
  const filterPropertyNames = Object.keys(filters);

  // short circit, as there is nothing to do.
  if (filterPropertyNames.length === 0) return items;
  
  /**
   * 1. The filter is always coming back as an array of strings with values we want to
   * remove from the table.
   */
  return items.filter((item: any) => {
    // Using filter property names because that list should always be equal to or
    // smaller then the total number of properties in the item.
    return filterPropertyNames.every((propertyName: any) => {
      // We are going to be getting either strings or array of strings.
      // Just throwing everything into an array now simplifies the logic
      // later.
      const values = typeof item[propertyName] === 'string' ? [item[propertyName]] : item[propertyName];
      const filterValues = filters[propertyName];

      // if the values contain any item in the filter value
      return filterValues.some((filterValue: string) => values.includes(filterValue));
    });
  });
}

export const selectTableFeature = createFeatureSelector<PageState<NetflixTitle>>('table');

/**
 * Current set of items for a page
 *
 * TODO: This selector is really heavy from overloading it with
 * search, sort, and filter. This should be refactored out.
 */
export const selectCurrentPage = createSelector(selectTableFeature, ({ items, page, pageSize, sort, search, filters }) => {
  let state: NetflixTitle[] = items.slice(0); // get a copy of the array
  const start = page * pageSize;
  const end = start + pageSize;

  state = sortTableItems(state, sort?.active as ISortBy<NetflixTitle>, sort?.direction);

  if (search) {
    const fuse = new Fuse(state, { ...searchOptions, keys: Object.keys(items[0]) });
    state = fuse.search(search).map((result) => result.item);
  }

  state = filterTableItems(state, filters);

  return state.slice(start, end);
});

/**
 * Number of items in each page
 */
export const selectPageSize = createSelector(selectTableFeature, ({ pageSize }) => pageSize);

/**
 * Total number of items in the dataset
 */
export const selectTotalCount = createSelector(selectTableFeature, ({ items, search, filters }) => {
  let state = items.slice(0); // get a copy of the array

  if (search) {
    const fuse = new Fuse(state, { ...searchOptions, keys: Object.keys(items[0]) });
    state = fuse.search(search).map((result) => result.item);
  }

  state = filterTableItems(state, filters);

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
 * All column names.
 *
 * NOTE: this only returns the keys of the first object in the dataset
 * and would require additional care if our dataset had optional properties
 * that might not be pressent on the object.
 */
export const selectAvailableColumns = createSelector(selectTableFeature, ({ items }) => Object.keys(items[0]));

/**
 * A graph dataset of the number of shows in each rating.
 */
export const selectNumbersByRating = createSelector(selectTableFeature, ({ items }) =>
  getNumbersByKey(items, 'rating', 'Missing Raiting')
);

/**
 * A graph dataset of the number of releases in each release year.
 */
export const selectNumbersByReleaseYear = createSelector(selectTableFeature, ({ items }) =>
  getNumbersByKey(items, 'release_year', 'Missing Release Year')
);

/**
 * A graph dataset of the top 15 release years with the most releases in them.
 */
export const selectNumbersByReleaseYearTop15 = createSelector(selectTableFeature, ({ items }) => {
  const numbersByReleaseYear = getNumbersByKey(items, 'release_year', 'Missing Release Year');

  return numbersByReleaseYear
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
