import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoginGuard } from './is-login.guard';
import { AppComponent } from './app.component';

const routes: Routes = [{
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path:'notify',
    loadChildren: () => import('./notifys/notifys.module').then(m => m.NotifysModule),
    canActivate: [IsLoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
