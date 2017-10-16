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
  servicesCollection:AngularFirestoreCollection<any[]>
  serviceCollection:Observable<any[]>
  constructor(private afDb: AngularFirestore) { }


setEnvoices(service:Envoice){
    this.afDb.doc('envoices/'+ service.uid).set(service);
    this.afDb.doc('envoices/'+ service.uid).collection('services').doc(service.service).set({
      price: 1200,
      detail: service.detail,
      nameService: service.service
    })
    
}

getInvoicesServices(uid){
  let envoService = this.afDb.doc('envoices/'+ uid).collection('services');
  return envoService.valueChanges(); 
}

getEnvoicesGeneral(uid){
  let envoService = this.afDb.doc('envoices/'+ uid);
  return envoService.valueChanges(); 
}

}
