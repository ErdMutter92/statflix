import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { PageState } from 'src/app/types/page.state';
import { SearchTableModule } from '../search/search.module';

import { ToolbarActionsComponent } from './toolbar-actions.component';

describe('ToolbarActionsComponent', () => {
  let component: ToolbarActionsComponent;
  let fixture: ComponentFixture<ToolbarActionsComponent>;

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
    filters: {},
    search: '',
    page: 0,
    pageSize: 5,
    items: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
      declarations: [ToolbarActionsComponent],
      imports: [NoopAnimationsModule, SearchTableModule, MatTooltipModule, MatInputModule, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
