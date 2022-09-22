import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { PageState } from 'src/app/types/page.state';
import { TableDataSource } from './table.datasource';
import { hot } from 'jasmine-marbles';
import { selectCurrentPage, selectPageSize, selectTotalCount } from './table.selectors';
import { CollectionViewer } from '@angular/cdk/collections';
import { columnSort, loadPage, pageChange } from './table.actions';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from 'src/app/types/sort.interface';

describe('TableDataSource', () => {
  const initialState: PageState<NetflixTitle> = {
    displayedColumns: [
      'show_id',
      'type',
      'title',
      'director',
      'cast',
      'country',
      'release_year',
      'rating',
      'duration',
      'listed_in',
    ],
    search: '',
    page: 0,
    pageSize: 2,
    items: [
      {
        show_id: 's1',
        type: 'Movie',
        title: 'Dick Johnson Is Dead',
        director: ['Kirsten Johnson'],
        cast: [],
        country: ['United States'],
        date_added: 'September 25, 2021',
        release_year: '2020',
        rating: 'PG-13',
        duration: '90 min',
        listed_in: ['Documentaries'],
        description:
          'As her father nears the end of his life, filmmaker Kirsten Johnson stages his death in inventive and comical ways to help them both face the inevitable.',
      },
      {
        show_id: 's2',
        type: 'TV Show',
        title: 'Blood & Water',
        director: [],
        cast: [
          'Ama Qamata',
          'Khosi Ngema',
          'Gail Mabalane',
          'Thabang Molaba',
          'Dillon Windvogel',
          'Natasha Thahane',
          'Arno Greeff',
          'Xolile Tshabalala',
          'Getmore Sithole',
          'Cindy Mahlangu',
          'Ryle De Morny',
          'Greteli Fincham',
          'Sello Maake Ka-Ncube',
          'Odwa Gwanya',
          'Mekaila Mathys',
          'Sandi Schultz',
          'Duane Williams',
          'Shamilla Miller',
          'Patrick Mofokeng',
        ],
        country: ['South Africa'],
        date_added: 'September 24, 2021',
        release_year: '2021',
        rating: 'TV-MA',
        duration: '2 Seasons',
        listed_in: ['International TV Shows', 'TV Dramas', 'TV Mysteries'],
        description:
          'After crossing paths at a party, a Cape Town teen sets out to prove whether a private-school swimming star is her sister who was abducted at birth.',
      },
      {
        show_id: 's3',
        type: 'TV Show',
        title: 'Ganglands',
        director: ['Julien Leclercq'],
        cast: [
          'Sami Bouajila',
          'Tracy Gotoas',
          'Samuel Jouy',
          'Nabiha Akkari',
          'Sofia Lesaffre',
          'Salim Kechiouche',
          'Noureddine Farihi',
          'Geert Van Rampelberg',
          'Bakary Diombera',
        ],
        country: [],
        date_added: 'September 24, 2021',
        release_year: '2021',
        rating: 'TV-MA',
        duration: '1 Season',
        listed_in: ['Crime TV Shows', 'International TV Shows', 'TV Action & Adventure'],
        description:
          'To protect his family from a powerful drug lord, skilled thief Mehdi and his expert team of robbers are pulled into a violent and deadly turf war.',
      },
    ],
  };

  let service: TableDataSource;
  let store: MockStore;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: { dashboard: initialState },
          selectors: [
            {
              selector: selectCurrentPage,
              value: initialState.items.slice(0, 2),
            },
            {
              selector: selectPageSize,
              value: 2,
            },
            {
              selector: selectTotalCount,
              value: 3,
            },
          ],
        }),
        TableDataSource,
      ],
    });

    store = TestBed.inject(MockStore);
    service = TestBed.inject(TableDataSource);
  });

  it('should contain the current set of page items', () => {
    expect(service.items).toBeDefined();

    const expected = hot('(0)', [initialState.items.slice(0, 2)]);

    expect(service.items).toBeObservable(expected);
  });

  it('should contain the current page size', () => {
    expect(service.pageSize).toBeDefined();

    const expected = hot('(0)', [initialState.pageSize]);

    expect(service.pageSize).toBeObservable(expected);
  });

  it('should contain the total item count', () => {
    expect(service.length).toBeDefined();

    const expected = hot('(0)', [3]);

    expect(service.length).toBeObservable(expected);
  });

  describe('connect', () => {
    it('should return the current set of page items', () => {
      const fakeCollectionViewer = {} as CollectionViewer;
      const result = service.connect(fakeCollectionViewer);
      const expected = hot('(0)', [initialState.items.slice(0, 2)]);

      expect(result).toBeObservable(expected);
    });
  });

  describe('disconnect', () => {
    it('should return the empty void', () => {
      const fakeCollectionViewer = {} as CollectionViewer;
      const result = service.disconnect(fakeCollectionViewer);
      expect(result).toBeUndefined();
    });
  });

  describe('loadPage', () => {
    it('should dispatch a loadPage event to the store', () => {
      const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
      const page = 2;

      service.loadPage(page);

      expect(dispatchSpy).toHaveBeenCalledOnceWith(loadPage({ page: 2 }));
    });
  });

  describe('paginate', () => {
    it('should dispatch a pageChange event to the store', () => {
      const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
      const event: PageEvent = { previousPageIndex: 0, pageIndex: 1, pageSize: 100, length: 200 };

      service.paginate(event);

      expect(dispatchSpy).toHaveBeenCalledOnceWith(pageChange(event));
    });
  });

  describe('columnSort', () => {
    it('should dispatch a columnSort event to the store', () => {
      const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
      const event: Sort = { direction: 'asc', active: 'cast' };

      service.sort(event);

      expect(dispatchSpy).toHaveBeenCalledOnceWith(columnSort(event));
    });
  });
});
