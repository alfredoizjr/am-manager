import { Component, OnInit } from '@angular/core';
import { fade } from './../../animations';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations:[
    fade
  ]
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }



}
