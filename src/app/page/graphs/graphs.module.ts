import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphsComponent } from './graphs.component';
import { GraphsRoutingModule } from './graphs-routing.module';
import { ToolbarActionsModule } from './toolbar-actions/toolbar-actions.module';
import { NumberCardsComponent } from './number-cards/number-cards.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TableModule } from '../table/table.module';

@NgModule({
  declarations: [GraphsComponent, NumberCardsComponent],
  imports: [CommonModule, NgxChartsModule, GraphsRoutingModule, ToolbarActionsModule, TableModule],
  exports: [GraphsComponent, NumberCardsComponent],
})
export class GraphsModule {}
