import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardDataSource } from './dashboard.datasource';

import { StoreModule } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { dashboardReducer } from './dashboard.reducer';

@NgModule({
  providers: [
    DashboardDataSource,
  ],
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    DashboardRoutingModule,
    StoreModule.forFeature('dashboard', dashboardReducer),
  ]
})
export class DashboardModule { }
