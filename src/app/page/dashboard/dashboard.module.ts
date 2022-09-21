import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardDataSource } from './dashboard.datasource';

import { StoreModule } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort'
import { dashboardReducer } from './dashboard.reducer';
import { CommonPipesModule } from '../../pipes/common-pipes.module';

@NgModule({
  providers: [
    DashboardDataSource,
  ],
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DashboardRoutingModule,
    CommonPipesModule,
    StoreModule.forFeature('dashboard', dashboardReducer),
  ]
})
export class DashboardModule { }
