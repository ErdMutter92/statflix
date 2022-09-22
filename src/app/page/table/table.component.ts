import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TableDataSource } from './table.datasource';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from 'src/app/types/sort.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { read: MatPaginator, static: true })
  private paginator: MatPaginator | undefined;

  public displayedColumns = ['show_id', 'type', 'title', 'director', 'cast', 'country', 'release_year', 'rating', 'duration', 'listed_in'];

  private changePageOnItemChange = this.datasource.length.subscribe(() => {
    this.paginator?.firstPage();
  });

  constructor(
    public datasource: TableDataSource,
  ) { }

  public ngOnInit(): void {
    this.datasource.loadPage();
  }

  public paginatorOnChange(event: PageEvent): void {
    this.datasource.paginate(event);
  }

  public sortOnChange(event: Sort): void {
    this.paginator?.firstPage();
    this.datasource.sort(event);
  }

  public ngOnDestroy() {
    this.changePageOnItemChange.unsubscribe();
  }
}
