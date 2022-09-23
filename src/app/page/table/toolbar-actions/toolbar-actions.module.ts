import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarActionsComponent } from './toolbar-actions.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchTableModule } from '../search/search.module';
import { ColumnSelectorTableModule } from '../column-selector/column-selector.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [ToolbarActionsComponent, FilterComponent],
  exports: [ToolbarActionsComponent, FilterComponent],
  imports: [
    CommonModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    SearchTableModule,
    ColumnSelectorTableModule,
  ],
})
export class ToolbarActionsModule {}
