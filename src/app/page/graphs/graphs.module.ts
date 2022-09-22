import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphsComponent } from './graphs.component';
import { GraphsRoutingModule } from './graphs-routing.module';
import { ToolbarActionsModule } from './toolbar-actions/toolbar-actions.module';



@NgModule({
  declarations: [
    GraphsComponent
  ],
  imports: [
    CommonModule,
    GraphsRoutingModule,
    ToolbarActionsModule,
  ]
})
export class GraphsModule { }
