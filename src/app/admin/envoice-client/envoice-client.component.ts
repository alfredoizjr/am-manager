import { fade, inBotom } from './../../animations';
import { UserService } from './../../services/user.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { Uuid } from 'ng2-uuid';
import { Envoice } from './../../models/envoice-client';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from './../../services/service.service';
import { EnvoicesService } from './../../services/envoices.service';

@Component({
  selector: 'app-envoice-client',
  templateUrl: './envoice-client.component.html',
  styleUrls: ['./envoice-client.component.css'],
  animations:[
    inBotom,
    fade
  ]
})
export class EnvoiceClientComponent implements OnInit {

  form: Envoice;
  user: any;
  id: string;
  serviceSet:any[] = [];
  general:any;
  total:number;
  tax:number = 6;
  plusTaxe:number;
  avatar:string;

  constructor(private serv: ServiceService,
    private envoiceServ: EnvoicesService,
    private route: ActivatedRoute,
    private userServ: UserService,
    private router:Router,
    private uuid: Uuid) { }

  ngOnInit() {
    this.route.params.subscribe(par =>{
      this.envoiceServ.getInvoicesServices(par.id).subscribe(data=>{
        this.serviceSet = data;
        this.total = this.getTotal(data);
        this.plusTaxe = this.getTotalPlusTaxe(this.total);
      });
      this.envoiceServ.getEnvoicesGeneral(par.id).subscribe(general =>{
         this.general = general;
         
      })
    })

    this.route.params.subscribe(par => this.id = par.id);
    this.userServ.getCurrentProfile(this.id).subscribe((data) =>{ 
      this.avatar = data.avatarUrl;
    });
    
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
          terms: 'COD',
          uuidCode: this.uuid.v1()
        }
         this.envoiceServ.setEnvoices(newForm);
     });
 }

 getTotal(value){
   let total:number =0
   for (var index = 0; index < value.length; index++) {
     total += value[index].price;
     }
     return total;
    }

 getTotalPlusTaxe(total){
   return total * 0.06;
 }
 
 openPrint(){
  window.print();
 }

 cancelEnvoice(){
   this.router.navigate(['/client-detail/',this.id]);
 }

}
