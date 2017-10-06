import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//services
import { UserService } from './user.service';
import { NotificationService } from './notification.service';


@Injectable()
export class AuthService {

  public user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private router: Router, private userServ: UserService, public notifServ: NotificationService) {
    this.user$ = this.afAuth.authState;
  }

  registerUser(form) {
    let roll:string = 'admin';
    this.userServ.chekingIsUserRegister().subscribe(user =>{
      if(user.length > 0){
        roll = 'worker';
      }else{
        roll = 'admin'
      }
    })
    this.afAuth.auth.createUserWithEmailAndPassword(form.email, form.password)
      .then(data => {
        this.userServ.regAdminOrRegularUser(data.uid, form ,roll);
        this.notifServ.success('User was create now can you login');
        this.router.navigate(['dashboard']);

      }).catch(err => {
        this.notifServ.error(err.message);
      })
    
  }

  loginUser(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logOutUser() {
    this.afAuth.auth.signOut();
  }

  profileUser() {
    return this.afAuth.authState;
  }
}
