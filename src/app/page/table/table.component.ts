import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TableDataSource } from './table.datasource';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from 'src/app/types/sort.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  @Input()
  public appearence: 'inline' | 'full' = 'full';

  public displayedColumns = this.datasource.displayedColumns;
  public showSettings = false;

  @ViewChild(MatPaginator, { read: MatPaginator, static: true })
  private paginator: MatPaginator | undefined;

  private changePageOnItemChange = this.datasource.length.subscribe(() => {
    this.paginator?.firstPage();
  });

  constructor(public datasource: TableDataSource) {}

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
