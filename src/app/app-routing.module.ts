import { NgModule } from '@angular/core';
import { RouterModule, Routes, ɵEmptyOutletComponent } from '@angular/router';
import { FrameComponent } from './frame/frame.component';

const routes: Routes = [
  {
    path: "",
    component: FrameComponent,
    children: [
      {
        path: "table",
        loadChildren: () => import('./page/table/table.module')
          .then((pkg) => pkg.TableModule)
      },
      {
        path: "dashboard",
        loadChildren: () => import('./page/dashboard/dashboard.module')
          .then((pkg) => pkg.DashboardModule)
      },
      {
        path: "graphs",
        component: ɵEmptyOutletComponent
      },
      {
        path: "**",
        redirectTo: "table"
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
