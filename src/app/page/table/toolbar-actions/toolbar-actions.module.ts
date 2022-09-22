import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarActionsComponent } from './toolbar-actions.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchTableModule } from '../search/search.module';

@NgModule({
  declarations: [ToolbarActionsComponent],
  exports: [ToolbarActionsComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatInputModule, MatTooltipModule, SearchTableModule],
})
export class ToolbarActionsModule {}
