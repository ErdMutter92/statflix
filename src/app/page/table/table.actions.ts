import { createAction, props } from '@ngrx/store';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';

export const loadPage = createAction('[table] load page', props<{ page: number }>());
export const addRow = createAction('[table] create row', props<{ row: NetflixTitle }>());
export const editRow = createAction('[table] edit row', props<{ id: string; partial: Partial<NetflixTitle> }>());
export const pageChange = createAction(
  '[table] paginate',
  props<{ pageIndex: number; previousPageIndex?: number; pageSize: number; length: number }>()
);
export const columnSort = createAction(
  '[table] column sort',
  props<{ active: string; direction: 'asc' | 'desc' | '' }>()
);
export const search = createAction('[table] search', props<{ search: string }>());
export const columnsVisible = createAction(
  '[table] column visibility',
  props<{ displayedColumns: (keyof NetflixTitle)[] }>()
);
export const addFilterColumn = createAction('[table] add filter', props<{ columnName: string, value: string[] }>());
export const removeFilterColumn = createAction('[table] remove filter', props<{ columnName: string }>());