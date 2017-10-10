import { Component, OnInit,Input,ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
//services
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { NotificationService } from './../../services/notification.service';

@Component({
  selector: 'upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.css']
})
export class UploadAvatarComponent implements OnInit {
 @Input('user-id') uid:string;
 @ViewChild('myInput') myInputVariable: any;

  constructor(private userServ: UserService, private auth: AuthService, private router: Router,public notifServ:NotificationService) { }

  ngOnInit() {
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

}
