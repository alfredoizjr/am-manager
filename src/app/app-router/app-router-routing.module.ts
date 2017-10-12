import { IsLoginGuard } from './../guards/is-login.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './../guards/admin-guard.guard';
//componets
import { HomeComponent } from './../home/home.component';
import { LoginComponent } from './../auth/login/login.component';
import { SingInComponent } from './../auth/sing-in/sing-in.component';
import { NoFoundComponent } from './../no-found/no-found.component';
import { EnvoicesComponent } from './../admin/envoices/envoices.component';
//private
import { DashboardComponent } from './../private/dashboard/dashboard.component';
import { ProfileComponent } from './../private/profile/profile.component';
import { SingUpClientsComponent } from './../auth/sing-up-clients/sing-up-clients.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path: 'login',component: LoginComponent, data: {state: 'login'}},
  {path: 'sing-up',component: SingInComponent,data: {state: 'sing-up'}},
  {path: 'sing-up-clients',component:SingUpClientsComponent,data: {state: 'sing-up-clients'}},
  {path: 'dashboard',component: DashboardComponent,canActivate: [IsLoginGuard],data: {state: 'dashboard'}},
  {path: 'profile',component: ProfileComponent,canActivate: [IsLoginGuard],data: {state: 'profile'}},
  {path: 'envoices',component: EnvoicesComponent,canActivate: [IsLoginGuard , AdminGuard],data: {state: 'envoices'}},
  {path: '**',component: NoFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterRoutingModule { }
