import { PageEvent } from '@angular/material/paginator';
import { createAction, props } from '@ngrx/store';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { Sort } from 'src/app/types/sort.interface';

export const loadPage = createAction('[table] load page', props<{ page: number }>());
export const addRow = createAction('[table] create row', props<{ row: NetflixTitle }>());
export const editRow = createAction('[table] edit row', props<{ id: string, partial: Partial<NetflixTitle> }>());
export const pageChange = createAction('[table] paginate', props<PageEvent>());
export const columnSort = createAction('[table] column sort', props<Sort>());
export const search = createAction('[table] search', props<{ search: string }>());
export const columnVisibility = createAction('[table] column visibility', props<{ name: keyof NetflixTitle, visibility: boolean }>());