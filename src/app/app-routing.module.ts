import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrameComponent } from './frame/frame.component';

const routes: Routes = [
  {
    path: "",
    component: FrameComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () => import('./page/dashboard/dashboard.module')
          .then((pkg) => pkg.DashboardModule)
      },
      {
        path: "**",
        redirectTo: "dashboard"
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
