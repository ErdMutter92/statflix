import { PageEvent } from '@angular/material/paginator';
import { createAction, props } from '@ngrx/store';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { Sort } from 'src/app/types/sort.interface';

export const loadPage = createAction('[dashboard] load page', props<{ page: number }>());
export const addRow = createAction('[dashboard] create row', props<{ row: NetflixTitle }>());
export const editRow = createAction('[dashboard] edit row', props<{ id: string, partial: Partial<NetflixTitle> }>());
export const pageChange = createAction('[dashboard] paginate', props<PageEvent>());
export const columnSort = createAction('[dashboard] column sort', props<Sort>());