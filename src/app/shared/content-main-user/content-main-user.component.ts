import { ISubscription } from 'rxjs/Subscription';
import { fade } from './../../animations';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'content-main-user',
  templateUrl: './content-main-user.component.html',
  styleUrls: ['./content-main-user.component.css'],
  animations:[
    fade
  ]
})
export class ContentMainUserComponent implements OnInit ,OnDestroy {

  @Input('data-info') data:object = {};
  @Input('data-clients') dataClients:any[]=[];

  constructor() { }

  ngOnInit() {
   
    
    
  }

  getDetailClient(uid){
    console.log(uid);
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }

}
