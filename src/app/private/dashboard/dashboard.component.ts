import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
//services
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit , OnDestroy {

  chekUser:ISubscription;
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
    this.chekUser = this.auth.user$.subscribe(user=>{
      if(!user){
        this.router.navigate(['login']);
      }
    })
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.chekUser.unsubscribe();
    
  }

}
