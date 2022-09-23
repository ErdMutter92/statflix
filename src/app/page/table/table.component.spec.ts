import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { NumberCardModule } from '@swimlane/ngx-charts';
import { hot } from 'jasmine-marbles';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { PageState } from 'src/app/types/page.state';
import { GraphsModule } from '../graphs/graphs.module';
import { SearchTableModule } from './search/search.module';

import { TableComponent } from './table.component';
import { datasource } from './table.data';
import { TableDataSource } from './table.datasource';

/**
 * This is a test helping type that disables the type
 * check to help facsilitate test mocking.
 */
type Friendly<type> = { [K in keyof type]: type[K] };
function friendly<type>(component: any): type {
  return component as type;
}

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

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
    pageSize: 1,
    filters: {},
    items: [
      datasource[0],
      datasource[2],
      datasource[3],
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [TableDataSource, provideMockStore({ initialState: { table: initialState } })],
      declarations: [TableComponent],
      imports: [
        NoopAnimationsModule,
        NumberCardModule,
        MatSidenavModule,
        SearchTableModule,
        CommonPipesModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default appearence (default: full)', () => {
    expect(component.appearence).toBe('full');
  });

  it('should contain an observable representation of the columns to display', () => {
    const expected = hot('(0)', [initialState.displayedColumns]);

    expect(component.displayedColumns).toBeDefined();
    expect(component.displayedColumns).toBeObservable(expected);
  });

  describe('ngOnInit', () => {
    it('should initalize datasource with first load page call', () => {
      spyOn(component.datasource, 'loadPage');

      component.ngOnInit();

      expect(component.datasource.loadPage).toHaveBeenCalled();
    });
  });

  describe('paginatorOnChange', () => {
    it('should paginate with event data', () => {
      spyOn(component.datasource, 'paginate');
      const event: PageEvent = { previousPageIndex: 0, pageIndex: 0, pageSize: 100, length: 200 };

      component.paginatorOnChange(event);

      expect(component.datasource.paginate).toHaveBeenCalledOnceWith(event);
    });
  });

  describe('sortOnChange', () => {
    it('should navigate to the first page', () => {
      const event: Sort = { active: 'show_id', direction: 'asc' };
      spyOn((component as any).paginator, 'firstPage');

      component.sortOnChange(event);

      expect((component as any).paginator.firstPage).toHaveBeenCalled();
    });

    it('should instruct the datasource to sort', () => {
      spyOn(component.datasource, 'sort');
      const event: Sort = { active: 'show_id', direction: 'asc' };

      component.sortOnChange(event);

      expect(component.datasource.sort).toHaveBeenCalledOnceWith(event);
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from changePageOnItemChange', () => {
      spyOn((component as any).changePageOnItemChange, 'unsubscribe').and.callThrough();

      component.ngOnDestroy();

      expect((component as any).changePageOnItemChange.unsubscribe).toHaveBeenCalled();
    });
  });
});
