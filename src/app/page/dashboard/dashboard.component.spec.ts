import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NetflixTitle } from '../../types/netflix-title.interface';
import { PageState } from 'src/app/types/page.state';
import { TableModule } from '../table/table.module';

import { DashboardComponent } from './dashboard.component';
import { StoreModule } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const initialState: PageState<NetflixTitle> = {
    displayedColumns: ['show_id', 'type', 'title', 'director', 'cast', 'country', 'release_year', 'rating', 'duration', 'listed_in'],
    search: '',
    page: 0,
    pageSize: 5,
    items: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
      declarations: [ DashboardComponent ],
      imports: [NoopAnimationsModule, TableModule, MatToolbarModule, StoreModule.forRoot({})]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
