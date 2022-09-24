import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { PageState } from 'src/app/types/page.state';
import { addFilterColumn, removeFilterColumn } from '../table.actions';

import { ColumnFilterComponent } from './column-filter.component';

describe('ColumnFilterComponent', () => {
  let component: ColumnFilterComponent;
  let fixture: ComponentFixture<ColumnFilterComponent>;

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
      declarations: [ColumnFilterComponent],
      imports: [NoopAnimationsModule, ReactiveFormsModule, CommonPipesModule, MatSelectModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default options (default: [])', () => {
    expect(component.options).toEqual([]);
  });

  it('should default appearance (default: standard)', () => {
    expect(component.appearance).toBe('standard');
  });

  it('should define columns control', () => {
    expect(component.columnsControl).toBeDefined();
    expect(component.columnsControl).toBeInstanceOf(FormControl);
  });

  describe('selectOnChange', () => {
    it('should dispatch add filter event when filters are set', () => {
      spyOn((component as any).store, 'dispatch');
      component.columnName = 'test';

      const value: string[] = ['1', '2'];

      component.selectionOnChange({ value } as MatSelectChange);

      expect((component as any).store.dispatch).toHaveBeenCalledWith(addFilterColumn({ columnName: 'test', value }));
    });

    it('should dispatch remove filter event when filters are removed', () => {
      spyOn((component as any).store, 'dispatch');
      component.columnName = 'test';

      const value: string[] = [];

      component.selectionOnChange({ value } as MatSelectChange);

      expect((component as any).store.dispatch).toHaveBeenCalledWith(removeFilterColumn({ columnName: 'test' }));
    });
  });
});
