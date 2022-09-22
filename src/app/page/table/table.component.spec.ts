import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { CommonPipesModule } from 'src/app/pipes/common-pipes.module';
import { NetflixTitle } from 'src/app/types/netflix-title.interface';
import { PageState } from 'src/app/types/page.state';
import { SearchTableModule } from './search/search.module';

import { TableComponent } from './table.component';
import { TableDataSource } from './table.datasource';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  const initialState: PageState<NetflixTitle> = {
    displayedColumns: ['show_id', 'type', 'title', 'director', 'cast', 'country', 'release_year', 'rating', 'duration', 'listed_in'],
    search: '',
    page: 0,
    pageSize: 5,
    items: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [TableDataSource, provideMockStore({ initialState }),],
      declarations: [TableComponent],
      imports: [NoopAnimationsModule, SearchTableModule, CommonPipesModule, MatTableModule, MatSortModule, MatPaginatorModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define the columns to be displayed by default', () => {
    expect(component.displayedColumns).toEqual(['show_id', 'type', 'title', 'director', 'cast', 'country', 'release_year', 'rating', 'duration', 'listed_in']);
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
});
