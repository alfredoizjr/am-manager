import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//services
import { AuthService } from './../../services/auth.service';
import { NotificationService } from './../../services/notification.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router,public notfServ:NotificationService) { }

  ngOnInit() {
    this.auth.profileUser();
  }


  loginUser(f){
    this.auth.loginUser(f.email,f.password).then(()=>{
      this.router.navigate(['dashboard']);
    }).catch((err)=>{
      this.notfServ.error(err.message);
    })
    
  }

}
