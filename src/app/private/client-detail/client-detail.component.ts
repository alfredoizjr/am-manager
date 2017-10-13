import { fade } from './../../animations';
import { Client } from './../../models/client.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
// services
import { UserService } from './../../services/user.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css'],
  animations:[
    fade
  ]
})
export class ClientDetailComponent implements OnInit,OnDestroy {
  data:any;
  subcribe:ISubscription;
  constructor(private route: ActivatedRoute,private userServ:UserService) { }

  ngOnInit() {

    this.subcribe = this.route.params.switchMap(uid =>{   
       return this.userServ.getCurrentProfile(uid.id);
    }).subscribe(data =>{ this.data = data})
    
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subcribe.unsubscribe();
  }

}
