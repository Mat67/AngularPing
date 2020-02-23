import { Component, OnInit } from '@angular/core';
import { Match } from '../model/match';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {
  match: Match;

  constructor() {
    this.match = new Match(6);
   }

  ngOnInit(): void {

  }
}
