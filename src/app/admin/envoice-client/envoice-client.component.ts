import { UserService } from './../../services/user.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { Envoice } from './../../models/envoice-client';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from './../../services/service.service';
import { EnvoicesService } from './../../services/envoices.service';

@Component({
  selector: 'app-envoice-client',
  templateUrl: './envoice-client.component.html',
  styleUrls: ['./envoice-client.component.css']
})
export class EnvoiceClientComponent implements OnInit {

  form: Envoice;
  user: any;
  id: string;
  constructor(private serv: ServiceService,
    private envoiceServ: EnvoicesService,
    private route: ActivatedRoute,
    private userServ: UserService) { }

  ngOnInit() {

  }

  submitEnvoices(form) {

    this.route.params.switchMap(par => {
      return this.userServ.getCurrentProfile(par.id)
    }).subscribe(data => {
      let newForm: Envoice = {
        fullname: data.fullname,
        uid: data.uid,
        service: form.service
      }

      this.envoiceServ.setEnvoices(newForm);
    })


  }

}
