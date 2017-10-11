import { Client } from './../models/client.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ClientService {
clientDoc:AngularFirestoreDocument<any>
client: Observable<any[]>
  constructor(private afDb: AngularFirestore) { }

  saveClientData(form:Client,uid){
    this.clientDoc = this.afDb.collection('user').doc(uid);
    this.clientDoc.set({
      fullname: form.fullname,
      email: form.email,
      singInData: new Date().toString(),
      business: form.business,
      phone: form.primary,
      secondary: form.secondary,
      role: "client",
      position:form.position
    });
  }



  


}
