import { Client } from './../models/client.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//services
import { NotificationService } from './notification.service';

@Injectable()
export class AlertsUserService {
  alertDoc:AngularFirestoreDocument<any>
  alertCollection:AngularFirestoreCollection<any>;
  singleAlert:Observable<any>;

  constructor(private afDb: AngularFirestore, public notifServ: NotificationService) { }
   
  setAlertToUser(uid,alert){
    return this.afDb.collection('alerts').doc(uid).collection('alert').doc('invoice').set({alert});
  }

  getAlerts(uid){
    this.alertDoc = this.afDb.doc('alerts/'+ uid).collection('alert').doc('invoice');
    return this.singleAlert = this.alertDoc.valueChanges();
  }
}
