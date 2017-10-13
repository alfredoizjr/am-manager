import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from './../models/user.interfaces';
import * as firebase from 'firebase';


@Injectable()
export class UserService {
  userDoc: AngularFirestoreDocument<User>
  userSet:AngularFirestoreDocument<any>
  userCollection: AngularFirestoreCollection<any[]>
  user: Observable<any[]>
  useSet:Observable<User>
  public progress: any = 0;
  constructor(private afDb: AngularFirestore) {

  }

  regAdminOrRegularUser(uid, user: User, role?: string) {
    this.userSet = this.afDb.collection('user').doc(uid);
    this.userSet.set({
      fullname: user.fullname,
      email: user.email,
      singInData: new Date().toString(),
      position: user.position,
      phone: '(954) 709-1318',
      ext: user.ext,
      role: role,
      uid: uid
    })
  }

  chekingIsUserRegister() {
    this.userCollection = this.afDb.collection('user');
    return this.user = this.userCollection.valueChanges();
  }

  getCurrentProfile(uid) {
    this.userSet  = this.afDb.doc('user/' + uid);
    return this.useSet = this.userSet.valueChanges();
  }

  updateProfile(uid, userData) {
    let userDoc = this.afDb.doc('user/' + uid).update(userData);
    return userDoc;
  }

  generateRandomName() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNQRSTUVWYXZabcdefghijklmnqrstuvwyxz0123456789";

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  uploadAvatarUser(file,uid) {
    let fileName = uid;
    let fileRef = firebase.storage().ref().child('avatar-user/' + fileName);
    let uploadTask = fileRef.put(file);
    return new Promise((resolve, reject) => {
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        // upload in progress

        this.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
      }, error => {
        reject(error);
      }, () => {
        let fileUrl = uploadTask.snapshot.downloadURL;
        resolve({ fileName, fileUrl });
      });
    });
  }

  userSaveAvatar(uid,fileUrl){
    this.userSet = this.afDb.doc('user/' +uid);
    this.userSet.update({avatarUrl: fileUrl});
  }

}
