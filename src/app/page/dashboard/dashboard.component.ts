import { Component, OnInit } from '@angular/core';
import { DashboardDataSource } from './dashboard.datasource';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public displayedColumns = ['show_id', 'type', 'title', 'director', 'cast', 'country', 'release_year', 'rating', 'duration', 'listed_in'];

  constructor(
    public datasource: DashboardDataSource,
  ) { }

  ngOnInit(): void {
    this.datasource.loadPage();
  }

  onPaginatorChange(event: PageEvent): void {
    this.datasource.paginate(event);
  }
}
