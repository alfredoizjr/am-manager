import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { Router } from '@angular/router';
//services
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { NotificationService } from './../../services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  subcription: ISubscription;
  userProfile: any;
  uid:string;

  constructor(private userServ: UserService, private auth: AuthService, private router: Router,public notfService:NotificationService) {

  }

  ngOnInit() {

    this.subcription = this.auth.user$.subscribe(user => {
      if(!user) return this.router.navigate(['login']);
      this.userServ.getCurrentProfileUser(user.uid).subscribe(dataUser => {
        this.userProfile = dataUser;
        this.uid = user.uid;

      });

    });
  }

  updateUser(f){
     
    this.userServ.updateProfile(this.uid,f).then(data=>{
      this.notfService.success('The data was update success');
    })
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subcription.unsubscribe();
  }

}
