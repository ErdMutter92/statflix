import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TableModule } from '../table/table.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarActionsModule } from './toolbar-actions/toolbar-actions.module';
import { GraphsModule } from '../graphs/graphs.module';
import { ColumnSelectorTableModule } from '../table/column-selector/column-selector.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ToolbarActionsModule,
    DashboardRoutingModule,
    TableModule,
    GraphsModule,
    MatToolbarModule,
    ColumnSelectorTableModule,
  ],
})
export class DashboardModule {}
