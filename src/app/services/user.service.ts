import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from './../models/user.interfaces';


@Injectable()
export class UserService {
userDoc:AngularFirestoreDocument<any>
user:Observable<any>

  constructor(private afDb: AngularFirestore) { 

  }

  refgisterAdminUser(uid,user:User){
    this.userDoc = this.afDb.collection('user').doc(uid);
    this.userDoc.set({
      fullname: user.fullname,
      email: user.email,
      singInData: new Date().toString(),
      isAdmin: true
    })
    
  }

}
