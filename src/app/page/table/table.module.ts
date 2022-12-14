import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableRoutingModule } from './table-routing.module';
import { TableDataSource } from './table.datasource';

import { StoreModule } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { tableReducer, FEATURE_NAME } from './table.reducer';
import { CommonPipesModule } from '../../pipes/common-pipes.module';
import { ToolbarActionsModule } from './toolbar-actions/toolbar-actions.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SearchTableModule } from './search/search.module';
import { ColumnFilterComponent } from './column-filter/column-filter.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  providers: [TableDataSource],
  declarations: [TableComponent, ColumnFilterComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    TableRoutingModule,
    CommonPipesModule,
    MatSidenavModule,
    StoreModule.forFeature(FEATURE_NAME, tableReducer),
  ],
  exports: [TableComponent, SearchTableModule],
})
export class TableModule {}
