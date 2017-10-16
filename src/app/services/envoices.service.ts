import { Envoice } from './../models/envoice-client';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Service } from './../models/service.interface';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';


@Injectable()
export class EnvoicesService {

  envoiceDoc: AngularFirestoreDocument<Envoice>
  envoice: AngularFirestoreDocument<Envoice>
  servicesCollection: AngularFirestoreCollection<any[]>
  serviceCollection: Observable<any[]>
  price: any;
  constructor(private afDb: AngularFirestore,public notfServ:NotificationService) { }


  setEnvoices(service: Envoice) {
    this.getServicePrice(service.service).subscribe(price => {

      this.price = price[0].price;
      this.afDb.doc('envoices/' + service.uid).set(service);
      this.afDb.doc('envoices/' + service.uid).collection('services').doc(service.service).set({
        price: this.price,
        detail: service.detail,
        nameService: service.service
      }).then(()=>{
        this.notfServ.success('The information was successfully processed');
      }).catch((err)=>{
        this.notfServ.error(err.message);
      })

    });

  }


  getInvoicesServices(uid) {
    let envoService = this.afDb.doc('envoices/' + uid).collection('services');
    return envoService.valueChanges();
  }

  getEnvoicesGeneral(uid) {
    let envoService = this.afDb.doc('envoices/' + uid);
    return envoService.valueChanges();
  }


  private getServicePrice(name): Observable<Service[]> {

    let ref = this.afDb.collection('services', par => {
      return par.where('serviceName', '==', name);
    });
    let price: Observable<Service[]>;
    return price = ref.valueChanges();
  }

}
