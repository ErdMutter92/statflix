import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarActionsComponent } from './toolbar-actions.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [ToolbarActionsComponent],
  exports: [ToolbarActionsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ]
})
export class ToolbarActionsModule { }
