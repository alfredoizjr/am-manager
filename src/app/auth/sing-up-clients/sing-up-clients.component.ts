import { Component, OnInit } from '@angular/core';
import { fade } from '../../animations';

@Component({
  selector: 'app-sing-up-clients',
  templateUrl: './sing-up-clients.component.html',
  styleUrls: ['./sing-up-clients.component.css'],
  animations:[fade]
})
export class SingUpClientsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
