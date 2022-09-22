import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table.component';
import { ToolbarActionsComponent } from './toolbar-actions/toolbar-actions.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TableComponent,
      },
      {
        path: '',
        outlet: 'actions',
        component: ToolbarActionsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
