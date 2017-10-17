import { fade,bottomFade } from './../../animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//service
import { EnvoicesService } from './../../services/envoices.service';

@Component({
  selector: 'app-envoices',
  templateUrl: './envoices.component.html',
  styleUrls: ['./envoices.component.css'],
  animations:[
    fade,
    bottomFade
  ]
})
export class EnvoicesComponent implements OnInit {

  constructor(public invServ:EnvoicesService,private route:Router) { }

  ngOnInit() {
    
  }

  goToInvoice(uid){
    this.route.navigate(['envoice-client',uid]);
  }

}
