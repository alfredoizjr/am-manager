import { Observable } from 'rxjs/Observable';
import { User } from './models/user.interfaces';
import { AuthService } from './services/auth.service';


import { UserService } from './services/user.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  constructor(){}

}
