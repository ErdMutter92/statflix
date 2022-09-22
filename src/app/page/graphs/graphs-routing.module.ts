import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphsComponent } from './graphs.component';
import { ToolbarActionsComponent } from './toolbar-actions/toolbar-actions.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: GraphsComponent
      },
      {
        path: "",
        outlet: 'actions',
        component: ToolbarActionsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraphsRoutingModule { }
