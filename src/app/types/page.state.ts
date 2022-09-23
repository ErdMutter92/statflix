import { NetflixTitle } from './netflix-title.interface';
import { Sort } from './sort.interface';

export type ColumnFilters = { [columnName: string]: string[] };

export type PageState<Item> = {
  displayedColumns: (keyof Item)[];
  pageSize: number;
  page: number;
  items: Item[];
  sort?: Sort;
  search: string;
  filters: ColumnFilters;
}
