import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable()
export class ServiceService {

  servicesCollection:AngularFirestoreCollection<any[]>;
  public services:Observable<any[]>;
  
  constructor(private afDb: AngularFirestore) { 
    this.getServices();
  }

private getServices(){
 this.servicesCollection = this.afDb.collection('services');
 this.services = this.servicesCollection.valueChanges();
}

}
