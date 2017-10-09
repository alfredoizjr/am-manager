import { IsLoginGuard } from './../guards/is-login.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//componets
import { HomeComponent } from './../home/home.component';
import { LoginComponent } from './../auth/login/login.component';
import { SingInComponent } from './../auth/sing-in/sing-in.component';
//private
import { DashboardComponent } from './../private/dashboard/dashboard.component';

const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'login',component: LoginComponent},
  {path: 'sing-in',component: SingInComponent},
  {path: '**',component: HomeComponent},
  {path: 'dashboard',component: DashboardComponent,canActivate: [IsLoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterRoutingModule { }
