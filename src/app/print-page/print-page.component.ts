import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../model/match';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.css']
})
export class PrintPageComponent implements OnInit {
  @Input() match: Match;

  constructor() { }

  ngOnInit(): void {
  }

  getDate() {
    // var date = this.match?.Date

    // return date.year

    return null;
  }

  getHeure() {

  }

}
