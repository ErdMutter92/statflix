import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { PageState } from 'src/app/types/page.state';
import { columnsVisible } from '../table.actions';

import { ColumnSelectorComponent } from './column-selector.component';

describe('ColumnSelectorComponent', () => {
  let component: ColumnSelectorComponent;
  let fixture: ComponentFixture<ColumnSelectorComponent>;

  const initialState: PageState<NetflixTitle> = {
    displayedColumns: ['show_id', 'type'],
    search: '',
    page: 0,
    pageSize: 5,
    filters: {},
    items: [
      { show_id: 'a', type: 'Movie', rating: 'PG', release_year: '2022' } as NetflixTitle,
      { show_id: 'b', type: 'TV Show', rating: 'PG-13', release_year: '2022' } as NetflixTitle,
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: { table: initialState } })],
      declarations: [ColumnSelectorComponent],
      imports: [NoopAnimationsModule, ReactiveFormsModule, CommonPipesModule, MatSelectModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should observe displayedColumns from the store', () => {
    expect(component.displayedColumns).toBeDefined();

    const expected = hot('(0)', [['show_id', 'type']]);

    expect(component.displayedColumns).toBeObservable(expected);
  });

  it('should observe available columns from the store', () => {
    expect(component.options).toBeDefined();

    const expected = hot('(0)', [['show_id', 'type', 'rating', 'release_year']]);

    expect(component.options).toBeObservable(expected);
  });

  it('should default appearance (default: standard)', () => {
    expect(component.appearance).toBe('standard');
  });

  it('should contain a columns form control', () => {
    expect(component.columnsControl).toEqual(jasmine.any(FormControl));
  });

  describe('ngOnInit', () => {
    xit('should set value for displayedColumns', () => {});
  });

  describe('selectOnChange', () => {
    it('should dispatch a columsVisible action to the store', () => {
      spyOn((component as any).store, 'dispatch');
      const value: (keyof NetflixTitle)[] = ['show_id'];

      component.selectionOnChange({ value } as MatSelectChange);

      expect((component as any).store.dispatch).toHaveBeenCalledWith(columnsVisible({ displayedColumns: value }));
    });
  });
});
