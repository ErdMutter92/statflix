import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphsComponent } from './graphs.component';
import { GraphsRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [
    GraphsComponent
  ],
  imports: [
    CommonModule,
    GraphsRoutingModule,
  ]
})
export class GraphsModule { }
