import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { fade } from './../animations';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
//services
import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations:[
    fade
  ]
})
export class NavbarComponent implements OnInit {

  isAdmin: any;
  userInfo: any;


  constructor(public auth: AuthService, private userServ: UserService) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.userServ.getCurrentProfile(user.uid).subscribe(dataUser => {
          this.isAdmin = dataUser;
          this.userInfo = dataUser;
        });
      }
    });
  }

  logout() {
    this.auth.logOutUser();
  }

}
