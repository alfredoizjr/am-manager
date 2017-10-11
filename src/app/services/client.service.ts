import { Client } from './../models/client.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//services
import { NotificationService } from './notification.service';

@Injectable()
export class ClientService {
  clientDoc: AngularFirestoreDocument<any>
  
 
  constructor(private afDb: AngularFirestore, public notifServ: NotificationService) { }

  saveClientData(form: Client, uid) {
    this.clientDoc = this.afDb.collection('user').doc(uid);
    this.clientDoc.set({
      fullname: form.fullname,
      email: form.email,
      singInData: new Date().toString(),
      business: form.business,
      businessType: form.businessType,
      phone: form.primary,
      secondary: form.secondary,
      role: "client",
      position: form.position,
      address: form.address,
      zipcode: form.zipcode,
    });

  }


  updateClient(form: Client, uid) {
    this.clientDoc = this.afDb.doc('user/' + uid);
    this.clientDoc.update({
      fullname: form.fullname,
      singInData: new Date().toString(),
      business: form.business,
      businessType: form.businessType,
      phone: form.primary,
      secondary: form.secondary,
      role: "client",
      position: form.position,
      address: form.address,
      zipcode: form.zipcode,
     })
      .then(() => {
        this.notifServ.success('The information was update');
      }).catch((err) => {
        this.notifServ.error(err.message);
      })

  }



}
