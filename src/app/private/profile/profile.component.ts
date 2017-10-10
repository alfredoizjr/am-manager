import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
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
  @ViewChild('myInput') myInputVariable: any;
  subcription: ISubscription;
  userProfile: any;
  uid: string;

  constructor(private userServ: UserService, private auth: AuthService, private router: Router,public notifServ:NotificationService) {

  }

  ngOnInit() {

    this.subcription = this.auth.user$.subscribe(user => {
      if (!user) return this.router.navigate(['login']);
      this.userServ.getCurrentProfileUser(user.uid).subscribe(dataUser => {
        this.userProfile = dataUser;
        this.uid = user.uid;

      });

    });
  }

  onFileSelection(event) {
    const filelist: FileList = event.target.files;
    
    if (filelist.length > 0) {
      let file: File = filelist[0];
      this.userServ.uploadAvatarUser(file,this.uid)
        .then(data => {
          this.userServ.userSaveAvatar(this.uid,data['fileUrl']);
          if(this.userServ.progress === 100){
             this.notifServ.success('the picture profile was add success!');
             this.myInputVariable.nativeElement.value = "";
          }
        }).catch(err => {
          console.log('errores', err);
        });
    }
  }


  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subcription.unsubscribe();
  }

}
