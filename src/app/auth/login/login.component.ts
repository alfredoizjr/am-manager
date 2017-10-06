import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//services
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {

    this.auth.profileUser();
  }

  loginUser(f){
    this.auth.loginUser(f.email,f.password).then(()=>{
      this.router.navigate(['dashboard']);
    })
    
  }

}
