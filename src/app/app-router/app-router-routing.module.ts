import { IsLoginGuard } from './../guards/is-login.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './../guards/admin-guard.guard';
//componets
import {HomeComponent,
        LoginComponent,
        SingInComponent,
        NoFoundComponent,
        EnvoicesComponent,
        ClientDetailComponent,
        EnvoiceClientComponent,
        DashboardComponent,//private
        ProfileComponent,//private
        SingUpClientsComponent//private
      } from './../index-components'

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path: 'login',component: LoginComponent, data: {state: 'login'}},
  {path: 'sing-up',component: SingInComponent,data: {state: 'sing-up'}},
  {path: 'sing-up-clients',component:SingUpClientsComponent,data: {state: 'sing-up-clients'}},
  {path: 'dashboard',component: DashboardComponent,canActivate: [IsLoginGuard],data: {state: 'dashboard'}},
  {path: 'profile',component: ProfileComponent,canActivate: [IsLoginGuard],data: {state: 'profile'}},
  {path: 'envoices',component: EnvoicesComponent,canActivate: [IsLoginGuard , AdminGuard],data: {state: 'envoices'}},
  {path: 'client-detail/:id',component: ClientDetailComponent,canActivate: [IsLoginGuard],data: {state: 'client-detail/:id'}},
  {path: 'envoice-client/:id',component: EnvoiceClientComponent,canActivate: [IsLoginGuard,AdminGuard],data: {state: 'envoice-client/:id'}},
  {path: '**',component: NoFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterRoutingModule { }
