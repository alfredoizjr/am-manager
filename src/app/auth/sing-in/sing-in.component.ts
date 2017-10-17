import { fade } from './../../animations';
import { Component, OnInit } from '@angular/core';
//services
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css'],
  animations:[fade]
})
export class SingInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }



}
