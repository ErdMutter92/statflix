import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TableModule } from '../table/table.module';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TableModule,
    MatToolbarModule,
  ]
})
export class DashboardModule { }
