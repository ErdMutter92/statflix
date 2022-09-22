import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarActionsComponent } from './toolbar-actions.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ToolbarActionsComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, MatMenuModule, RouterModule],
})
export class ToolbarActionsModule {}
