import { IsLoginGuard } from './../guards/is-login.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//componets
import { HomeComponent } from './../home/home.component';
import { LoginComponent } from './../auth/login/login.component';
import { SingInComponent } from './../auth/sing-in/sing-in.component';
import { NoFoundComponent } from './../no-found/no-found.component';
//private
import { DashboardComponent } from './../private/dashboard/dashboard.component';
import { ProfileComponent } from './../private/profile/profile.component';
import { SingUpClientsComponent } from './../auth/sing-up-clients/sing-up-clients.component';

const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'login',component: LoginComponent},
  {path: 'sing-up',component: SingInComponent},
  {path: 'sing-up-clients',component:SingUpClientsComponent},
  {path: 'dashboard',component: DashboardComponent,canActivate: [IsLoginGuard]},
  {path: 'profile',component: ProfileComponent,canActivate: [IsLoginGuard]},
  {path: '**',component: NoFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterRoutingModule { }
