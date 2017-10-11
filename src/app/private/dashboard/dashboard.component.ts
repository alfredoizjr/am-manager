import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { Router } from '@angular/router';
//services
import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userProfile: object = {};
  chekUser: ISubscription;
  constructor(private auth: AuthService, private router: Router, private userServ: UserService) { }

  ngOnInit() {
    this.chekUser = this.auth.user$.subscribe(user => {
      if (!user) {
        this.router.navigate(['login']);
        return false;
      }

      this.userServ.getCurrentProfile(user.uid).subscribe((userData) => {

        this.userProfile = userData;

      });

    });
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.chekUser.unsubscribe();

  }

}
