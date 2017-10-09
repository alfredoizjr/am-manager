import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from './../models/user.interfaces';


@Injectable()
export class UserService {
userDoc:AngularFirestoreDocument<any>
userCollection:AngularFirestoreCollection<any[]>
user:Observable<any[]>

  constructor(private afDb: AngularFirestore) { 
    
  }

  regAdminOrRegularUser(uid,user:User,role?:string){
    this.userDoc = this.afDb.collection('user').doc(uid);
    this.userDoc.set({
      fullname: user.fullname,
      email: user.email,
      singInData: new Date().toString(),
      position: user.position,
      phone: 9547091318,
      ext:  user.ext,
      role: role 
    })
  }

  chekingIsUserRegister(){
    this.userCollection = this.afDb.collection('user');
    return this.user = this.userCollection.valueChanges();
  }

  getCurrentProfileUser(uid){
     let userDoc = this.afDb.doc('user/'+uid);
     return userDoc.valueChanges();
  }

  updateProfile(uid,userData){
    let userDoc = this.afDb.doc('user/'+ uid).update(userData);
    return userDoc;
  }

}
