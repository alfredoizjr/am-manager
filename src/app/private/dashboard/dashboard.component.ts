import { fade } from './../../animations';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { Router } from '@angular/router';
//services
import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { ClientService } from './../../services/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations:[
    fade
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userProfile: object = {};
  subcribe: ISubscription;
  clients:any;
  constructor(private auth: AuthService, private router: Router, private userServ: UserService,private clientServ:ClientService) { }

  ngOnInit() {
    this.subcribe = this.auth.user$.subscribe(user => {
      if (!user) {
        this.router.navigate(['login']);
        return false;
      }

      this.userServ.getCurrentProfile(user.uid).subscribe((userData) => {
         this.userProfile = userData;
       });
    });

    this.clients = this.clientServ.getClients()
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subcribe.unsubscribe();

  }

}
