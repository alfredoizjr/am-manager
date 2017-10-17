import { Component, OnInit, OnDestroy } from '@angular/core';
import { fade, inBotom,leftFed, bottomFade } from './../../animations';
import { UserService } from './../../services/user.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { Uuid } from 'ng2-uuid';
import { Envoice } from './../../models/envoice-client';
import { ServiceService } from './../../services/service.service';
import { EnvoicesService } from './../../services/envoices.service';

@Component({
  selector: 'app-envoice-client',
  templateUrl: './envoice-client.component.html',
  styleUrls: ['./envoice-client.component.css'],
  animations:[
    inBotom,
    fade,
    leftFed,
    bottomFade
  ]
})
export class EnvoiceClientComponent implements OnInit,OnDestroy {

  form: Envoice;
  user: any;
  id: string;
  serviceSet:any[] = [];
  general:any;
  total:number;
  tax:number = 6;
  plusTaxe:number;
  avatar:string;
  doDateRef:any;

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
        console.log(this.serviceSet);
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
   // get the profile user for use some data

   this.userServ.getCurrentProfile(this.id).subscribe(data => {
      
      //  if the field of do date is empty just set the old one
       this.doDateRef = (form.doDate) ? form.doDate.month +"/"+form.doDate.day+"/"+ form.doDate.year : this.general.doDate;
     //set the objet for update the data;
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
          doDate: this.doDateRef,
          terms: 'COD',
          uuidCode: this.uuid.v1()
        }
         // sent the data
        return this.envoiceServ.setEnvoices(newForm);
     });
 }
// get the total amount with out tax
 getTotal(value){
   let total:number =0
   for (var index = 0; index < value.length; index++) {
     total += value[index].price;
     }
     return total;
    }

// add the tax
 getTotalPlusTaxe(total){
   return total * 0.06;
 }
 
 openPrint(){
  window.print();
 }

 cancelEnvoice(){
   this.router.navigate(['/client-detail/',this.id]);
 }

 removeServiceInVoice(docId){
    this.envoiceServ.removeInvoiceService(this.id,docId);
 }

 ngOnDestroy() {
   //Called once, before the instance is destroyed.
   //Add 'implements OnDestroy' to the class.
 
 }

}
