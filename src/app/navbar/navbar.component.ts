import { Component, OnInit } from '@angular/core';
//services
import { AuthService } from './../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

constructor(public auth:AuthService) { }

  ngOnInit() {
    
  }

  

  logout(){
    this.auth.logOutUser();
    console.log('logout');
  }
}
