import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AppRouterRoutingModule } from './app-router/app-router-routing.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { UuidModule } from 'ng2-uuid';

//firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
//services
import {UserService,
        AuthService,
        ClientService,
        EnvoicesService,
        NotificationService,
        ServiceService,
        } from './services/index-service';
//guards
import { IsLoginGuard } from './guards/is-login.guard';
import { AdminGuard } from './guards/admin-guard.guard';
//componets
import {AppComponent,
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
        ContentMainUserComponent,
        ContentMainClientComponent,
        EnvoicesComponent,
        ClientDetailComponent,
        DataTableComponent
       } from './index-components';
import { EnvoiceClientComponent } from './admin/envoice-client/envoice-client.component'


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
    ContentMainUserComponent,
    ContentMainClientComponent,
    EnvoicesComponent,
    ClientDetailComponent,
    DataTableComponent,
    EnvoiceClientComponent,
  
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
    FormsModule, // forms
    UuidModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,IsLoginGuard,UserService,NotificationService,ClientService,AdminGuard,EnvoicesService,ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
