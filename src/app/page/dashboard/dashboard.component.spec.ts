import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NetflixTitle } from '../../types/netflix-title.interface';
import { PageState } from 'src/app/types/page.state';
import { TableModule } from '../table/table.module';

import { DashboardComponent } from './dashboard.component';
import { StoreModule } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { hot } from 'jasmine-marbles';
import { GraphsModule } from '../graphs/graphs.module';
import { ColumnSelectorComponent } from '../table/column-selector/column-selector.component';
import { DeslugifyPipe } from 'src/app/pipes/deslugify.pipe';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

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
    pageSize: 5,
    filters: {},
    items: [
      { rating: 'PG' } as NetflixTitle,
      { rating: 'PG-13' } as NetflixTitle,
      { rating: 'PG-13' } as NetflixTitle,
      { rating: 'R' } as NetflixTitle,
      { rating: 'R' } as NetflixTitle,
      { rating: 'R' } as NetflixTitle,
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: { table: initialState } })],
      declarations: [DashboardComponent, ColumnSelectorComponent, DeslugifyPipe],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        TableModule,
        GraphsModule,
        MatToolbarModule,
        MatSelectModule,
        StoreModule.forRoot({}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain an inline app table', () => {
    fixture.detectChanges();
    const appTable = fixture.nativeElement.querySelector('app-table');

    expect(appTable).toBeDefined();
    expect(appTable.getAttribute('appearence')).toBe('inline');
  });

  it('should observe retings from the store', () => {
    expect(component.ratings).toBeDefined();

    const expected = hot('(0)', [
      [
        { name: 'PG', value: 1 },
        { name: 'PG-13', value: 2 },
        { name: 'R', value: 3 },
      ],
    ]);

    expect(component.ratings).toBeObservable(expected);
  });
});
