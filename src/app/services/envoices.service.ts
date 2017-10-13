import { Envoice } from './../models/envoice-client';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';


@Injectable()
export class EnvoicesService {

  envoiceDoc: AngularFirestoreDocument<Envoice>
  envoice: AngularFirestoreDocument<Envoice>
  constructor(private afDb: AngularFirestore) { }


setEnvoices(service:Envoice){
    this.afDb.doc('envoices/'+ service.uid).update(service);
}

getInvoices(){

}

}
