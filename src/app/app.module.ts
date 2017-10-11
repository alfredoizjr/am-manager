import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AppRouterRoutingModule } from './app-router/app-router-routing.module';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation'
//firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
//services
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';
import { ClientService } from './services/client.service';
//guards
import { IsLoginGuard } from './guards/is-login.guard';
//componets
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SingInComponent } from './auth/sing-in/sing-in.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { ProfileComponent } from './private/profile/profile.component';
import { NoFoundComponent } from './no-found/no-found.component';
import { RegisterFormComponent } from './shared/register-form/register-form.component';
import { LoginFormComponent } from './shared/login-form/login-form.component';
import { UploadAvatarComponent } from './shared/upload-avatar/upload-avatar.component';
import { SingUpClientsComponent } from './auth/sing-up-clients/sing-up-clients.component';
import { RegisterClientsFormComponent } from './shared/register-clients-form/register-clients-form.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SingInComponent,
    DashboardComponent,
    ProfileComponent,
    NoFoundComponent,
    RegisterFormComponent,
    LoginFormComponent,
    UploadAvatarComponent,
    SingUpClientsComponent,
    RegisterClientsFormComponent,
  
  ],
  imports: [
    NgbModule.forRoot(),
    CustomFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    AppRouterRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    FormsModule // forms
  ],
  providers: [AuthService,IsLoginGuard,UserService,NotificationService,ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
