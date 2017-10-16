import { fade } from './../../animations';
import { UserService } from './../../services/user.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { Envoice } from './../../models/envoice-client';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from './../../services/service.service';
import { EnvoicesService } from './../../services/envoices.service';

@Component({
  selector: 'app-envoice-client',
  templateUrl: './envoice-client.component.html',
  styleUrls: ['./envoice-client.component.css'],
  animations:[
    fade
  ]
})
export class EnvoiceClientComponent implements OnInit {

  form: Envoice;
  user: any;
  id: string;
  serviceSet:any[] = [];
  detail:boolean = false;
  general:any;
  constructor(private serv: ServiceService,
    private envoiceServ: EnvoicesService,
    private route: ActivatedRoute,
    private userServ: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(par =>{
      this.envoiceServ.getInvoicesServices(par.id).subscribe(data=>{
        this.serviceSet = data;
      });
      this.envoiceServ.getEnvoicesGeneral(par.id).subscribe(general =>{
         this.general = general;
      })
    })
  }

  submitEnvoices(form) {

    this.route.params.switchMap(par => {
      return this.userServ.getCurrentProfile(par.id)
    }).subscribe(data => {
      let newForm: Envoice = {
        fullname: data.fullname,
        uid: data.uid,
        service: form.service,
        qty: + 1,
        date: new Date().toDateString(),
        detail: form.detail,
        address:data.address,
        zipcode:data.zipcode,
        businessName:data.business,
        doDate: form.doDate,
        terms: 'COD'
      }
      this.detail = true;
      this.envoiceServ.setEnvoices(newForm);
    });


  }

}
