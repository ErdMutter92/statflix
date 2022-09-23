import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { hot } from 'jasmine-marbles';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { PageState } from 'src/app/types/page.state';
import { GaugeComponent } from './gauge/gauge.component';

import { GraphsComponent } from './graphs.component';
import { NumberCardsComponent } from './number-cards/number-cards.component';

describe('GraphsComponent', () => {
  let component: GraphsComponent;
  let fixture: ComponentFixture<GraphsComponent>;

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
      { rating: 'PG', release_year: '2022' } as NetflixTitle,
      { rating: 'PG-13', release_year: '2022' } as NetflixTitle,
      { rating: 'PG-13', release_year: '2022' } as NetflixTitle,
      { rating: 'R', release_year: '2021' } as NetflixTitle,
      { rating: 'R', release_year: '2021' } as NetflixTitle,
      { rating: 'R', release_year: '2020' } as NetflixTitle,
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: { table: initialState } })],
      declarations: [GraphsComponent, NumberCardsComponent, GaugeComponent],
      imports: [NgxChartsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(GraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should observe ratingsByNumbers from the store', () => {
    expect(component.ratingsByNumbers).toBeDefined();

    const expected = hot('(0)', [[
      { name: 'PG', value: 1 },
      { name: 'PG-13', value: 2},
      { name: 'R', value: 3 }
    ]]);

    expect(component.ratingsByNumbers).toBeObservable(expected);
  });

  it('should observe releaseYearsByNumbers from the store', () => {
    expect(component.releaseYearsByNumbers).toBeDefined();

    const expected = hot('(0)', [[
      { name: '2022', value: 3 },
      { name: '2021', value: 2 },
      { name: '2020', value: 1 }
    ]]);

    expect(component.releaseYearsByNumbers).toBeObservable(expected);
  });
});
