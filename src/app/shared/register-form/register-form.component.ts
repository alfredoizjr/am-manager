import { Component, OnInit, Input } from '@angular/core';
//services
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { NotificationService } from './../../services/notification.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Input('uid') uid = {};
  @Input('user-data') userData:Object = {};
  @Input('main-registration') mainRegistration:boolean = true;
  constructor(private auth: AuthService, private userServ: UserService, public notfService: NotificationService) {

   }

  ngOnInit() {
  }


  registerUser(f) {
    this.auth.registerUser(f);
  }

  updateUser(f) {
    this.userServ.updateProfile(this.uid, f).then(data => {
      this.notfService.success('The data was update success');
    });
  }
}
