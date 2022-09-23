import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { PageState } from 'src/app/types/page.state';
import { search } from '../table.actions';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

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
    items: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [provideMockStore({ initialState })],
      imports: [NoopAnimationsModule, FormsModule, MatButtonModule, MatIconModule, MatInputModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default appearence (default: standard)', () => {
    expect(component.appearance).toBe('standard');
  });

  it('should default value (default: "")', () => {
    expect(component.value).toBe('');
  });

  xdescribe('ngOnInit', () => {
    it('shhould set the inital search value based on search state', () => {});
  });

  describe('clear', () => {
    it('should reset the search value', () => {
      const searchTerm = 'search';
      component.value = searchTerm;
      fixture.detectChanges();

      component.clear();

      expect(component.value).not.toBe(searchTerm);
      expect(component.value).toBe('');
    });

    it('should dispatch empty search value to the store', () => {
      spyOn((component as any).store, 'dispatch');
      const searchTerm = 'search';
      component.value = searchTerm;
      fixture.detectChanges();

      component.clear();

      expect((component as any).store.dispatch).toHaveBeenCalledWith(search({ search: '' }));
    });
  });

  describe('onEnter', () => {
    it('should dispatch search value to the store', () => {
      spyOn((component as any).store, 'dispatch');
      const searchTerm = 'search';
      component.value = searchTerm;
      fixture.detectChanges();

      component.onEnter();

      expect((component as any).store.dispatch).toHaveBeenCalledWith(search({ search: searchTerm }));
    });
  });
});
