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
        loadChildren: () => import('./page/table/table.module')
          .then((pkg) => pkg.TableModule)
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
