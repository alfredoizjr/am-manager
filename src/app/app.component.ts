import { UserService } from './services/user.service';
import { Component } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(userServ:UserService) {
    userServ.chekingIsUserRegister();
  }

}
