import { Component, OnInit } from '@angular/core';
//services
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'register-clients-form',
  templateUrl: './register-clients-form.component.html',
  styleUrls: ['./register-clients-form.component.css']
})
export class RegisterClientsFormComponent implements OnInit {

  constructor(private authServ:AuthService) { }

  ngOnInit() {
  }

  registerClient(form){
      this.authServ.registerClient(form);
  }

}
