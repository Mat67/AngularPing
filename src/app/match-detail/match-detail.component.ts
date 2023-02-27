import { Component, OnInit } from '@angular/core';
import { App } from '../model/app';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {
  app: App;

  constructor() {
    this.app = new App()
   }

  ngOnInit(): void {

  }



  afficher() {
    return this.app.match
  }
}
