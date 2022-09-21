import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableRoutingModule } from './table-routing.module';
import { TableDataSource } from './table.datasource';

import { StoreModule } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort'
import { tableReducer, FEATURE_NAME } from './table.reducer';
import { CommonPipesModule } from '../../pipes/common-pipes.module';
import { ToolbarActionsModule } from './toolbar-actions/toolbar-actions.module';

@NgModule({
  providers: [
    TableDataSource,
  ],
  declarations: [
    TableComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    ToolbarActionsModule,
    MatPaginatorModule,
    MatSortModule,
    TableRoutingModule,
    CommonPipesModule,
    StoreModule.forFeature(FEATURE_NAME, tableReducer),
  ]
})
export class TableModule {}
