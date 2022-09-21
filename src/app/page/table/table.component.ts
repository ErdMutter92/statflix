import { Component, OnInit } from '@angular/core';
import { TableDataSource } from './table.datasource';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from 'src/app/types/sort.interface';

@Component({
  selector: 'app-table-page',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public displayedColumns = ['show_id', 'type', 'title', 'director', 'cast', 'country', 'release_year', 'rating', 'duration', 'listed_in'];

  constructor(
    public datasource: TableDataSource,
  ) { }

  ngOnInit(): void {
    this.datasource.loadPage();
  }

  onPaginatorChange(event: PageEvent): void {
    this.datasource.paginate(event);
  }

  /**
   * Upon a sorting event the user is taken to the first page of the
   * table with their sort applied. This is the prevent the user from
   * getting lost in the middle of the dataset after the sort.
   * 
   * @param event Material Sort event when header element is clicked
   * @param paginator Material paginator ref
   */
  onSort(event: Sort, paginator: MatPaginator): void {
    // NOTE: to keep the external component's state synced we are deligating the
    // go to first page to the paginator. This will trigger a change event that
    // will bubble up to the redux store and change the page's contents.
    paginator.firstPage();
    this.datasource.sort(event);
  }
}
