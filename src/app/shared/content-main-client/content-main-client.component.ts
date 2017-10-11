import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'content-main-client',
  templateUrl: './content-main-client.component.html',
  styleUrls: ['./content-main-client.component.css']
})


export class ContentMainClientComponent implements OnInit {

  @Input('data-info') data:object = {};

  constructor() { }

  ngOnInit() {
  }

}
