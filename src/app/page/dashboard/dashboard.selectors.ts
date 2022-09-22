import { createSelector } from '@ngrx/store';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { PageState } from 'src/app/types/page.state';

export const tableFeature = (state: { table: PageState<NetflixTitle> }) => state.table;

export const selectMissingCastEntries = createSelector(
    tableFeature,
    (state) => state.items.filter(item => item.cast.length === 0).length,
)