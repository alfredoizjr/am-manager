import { Component, OnInit, Input } from '@angular/core';
//services
import { AuthService } from './../../services/auth.service';
import { ClientService } from './../../services/client.service';

@Component({
  selector: 'register-clients-form',
  templateUrl: './register-clients-form.component.html',
  styleUrls: ['./register-clients-form.component.css']
})
export class RegisterClientsFormComponent implements OnInit {

  @Input('user-data') userData: object = {};
  @Input('is-main-form') isMain: boolean = true;
  @Input('user-id') uid: string = null;
  constructor(private authServ: AuthService, private clientServ: ClientService) { }

  ngOnInit() {
    
  }

 updateClient(form){
  
  this.clientServ.updateClient(form, this.uid);
  
}

  registerClient(form) {
    
    this.authServ.registerClient(form);
}

}
