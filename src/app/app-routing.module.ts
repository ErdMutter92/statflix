import { NgModule } from '@angular/core';
import { RouterModule, Routes, ɵEmptyOutletComponent } from '@angular/router';
import { FrameComponent } from './frame/frame.component';

const routes: Routes = [
  {
    path: 'app',
    component: FrameComponent,
    children: [
      {
        path: 'table',
        loadChildren: () => import('./page/table/table.module').then((pkg) => pkg.TableModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./page/dashboard/dashboard.module').then((pkg) => pkg.DashboardModule),
      },
      {
        path: 'graphs',
        loadChildren: () => import('./page/graphs/graphs.module').then((pkg) => pkg.GraphsModule),
      },
      {
        path: '**',
        redirectTo: 'table',
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then((pkg) => pkg.LoginModule),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
