import { Component, OnInit, OnDestroy } from '@angular/core';
import { fade, inBotom, leftFed, bottomFade, topFade } from './../../animations';
import { UserService } from './../../services/user.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { Uuid } from 'ng2-uuid';
import { Envoice } from './../../models/envoice-client';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ISubscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
//services
import { AlertsUserService } from './../../services/alerts-user.service';
import { AuthService } from './../../services/auth.service';
import { NotificationsService } from 'angular2-notifications';
import { ServiceService } from './../../services/service.service';
import { EnvoicesService } from './../../services/envoices.service';


@Component({
  selector: 'app-envoice-client',
  templateUrl: './envoice-client.component.html',
  styleUrls: ['./envoice-client.component.css'],
  animations: [
    inBotom,
    fade,
    leftFed,
    bottomFade,
    topFade
  ]
})
export class EnvoiceClientComponent implements OnInit, OnDestroy {

  form: Envoice;
  invoiseSave: boolean;
  adminUser:object;
  id: string;
  serviceSet: any[] = [];
  general: any;
  total: number;
  tax: number = 6;
  plusTaxe: number;
  avatar: string;
  date: any;
  subcribe: ISubscription;
  // form
  formActive = new FormGroup({
    detail: new FormControl('', [Validators.required, Validators.minLength(5)]),
    doDate: new FormControl(),
    service: new FormControl('', Validators.required)
  });

  constructor(private serv: ServiceService,
    private envoiceServ: EnvoicesService,
    private route: ActivatedRoute,
    private userServ: UserService,
    private router: Router,
    private uuid: Uuid,
    private location: Location,
    public notiServ: NotificationsService,
    private authServ: AuthService,
    private alerServ: AlertsUserService) { }

  ngOnInit() {
   this.subcribe = this.authServ.user$.switchMap(data=>{
      return this.userServ.getCurrentProfile(data.uid);
      }).subscribe(user =>{
        this.adminUser = user.fullname;
      });
   
    this.subcribe = this.authServ.user$.subscribe(user => {
      if (!user) {
        this.router.navigate(['login']);
        return false;
      }
    });

    this.route.params.subscribe(par => {
      this.envoiceServ.getInvoicesServices(par.id).subscribe(data => {
        this.serviceSet = data;
        this.total = this.getTotal(data);
        this.plusTaxe = this.getTotalPlusTaxe(this.total);

      });
      this.envoiceServ.getEnvoicesGeneral(par.id).subscribe(general => {
        this.general = general;

      })
    })

    this.route.params.subscribe(par => this.id = par.id);
    this.userServ.getCurrentProfile(this.id).subscribe((data) => {
      this.avatar = data.avatarUrl;
    });
    // see is the invoice is already seve
    this.subcribe = this.alerServ.getAlerts(this.id)
      .subscribe(data => {
        return data;
      });
     // see is in the invoice is any service set already
     // is not can't use submit button
      this.subcribe = this.envoiceServ.getInvoicesServices(this.id)
          .subscribe(data=>{
             this.invoiseSave = (data.length > 0)? true : false;
          });
     
          
  }

  submitEnvoices() {
    // if have value on do date field
    if (this.formActive.get('doDate').value) {
      this.date = this.formActive.get('doDate').value.month + "/" + this.formActive.get('doDate').value.day + "/" + this.formActive.get('doDate').value.year;
    }


    // get the profile user for use some data
    this.userServ.getCurrentProfile(this.id).subscribe(data => {

      // if the envoice have uinique number alredy or not
      let code = (!this.general) ? this.uuid.v1() : this.general.uuidCode;
      //if the field of do date is empty just set the old one
      let doDate = (this.formActive.get('doDate').value) ? this.date : this.general.doDate;
      //set the objet for update the data;
      let newForm: Envoice = {
        fullname: data.fullname,
        uid: data.uid,
        service: this.formActive.get('service').value,
        qty: + 1,
        date: new Date().toDateString(),
        detail: this.formActive.get('detail').value,
        address: data.address,
        zipcode: data.zipcode,
        businessName: data.business,
        doDate: doDate,
        terms: 'COD',
        uuidCode: code
      }
      // sent the data
      return this.envoiceServ.setEnvoices(newForm);
    });
  }
  // get the total amount with out tax
  getTotal(value) {
    let total: number = 0
    for (var index = 0; index < value.length; index++) {
      total += value[index].price;
    }
    return total;
  }

  // add the tax
  getTotalPlusTaxe(total) {
    return total * 0.06;
  }

  openPrint() {
    window.print();
  }

  // cancelInvoice() {
  //   this.router.navigate(['/client-detail/', this.id]);
  // }
  //remove the service set in side of invoice doc
  removeServiceInVoice(docId) {
    this.envoiceServ.removeInvoiceService(this.id, docId);
  }

  //remove the invoice in self
  removeInvoice() {
    this.envoiceServ.removeTheInvoice(this.id);
    this.setInvoiceInUser(this.id, false, "delete");
  }


  cancelInvoice() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  setInvoiceInUser(uid: string, invoice?: boolean, inst?: string) {
    
    let action = (invoice == false) ? { invoice: false, visited: false } : { invoice: true, visited: false, createBy: this.adminUser};

    this.alerServ.setAlertToUser(uid, action).then(() => {
      if (inst != "delete") {
        return this.notiServ.success('the invoice was save');
      }
    });
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subcribe.unsubscribe();
  }

}
