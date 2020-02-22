import { Component, OnInit, Input } from '@angular/core';
import { Rencontre } from '../model/rencontre';
import { Match } from '../model/match';

@Component({
  selector: 'app-rencontres',
  templateUrl: './rencontres.component.html',
  styleUrls: ['./rencontres.component.css']
})
export class RencontresComponent implements OnInit {
  @Input() rencontres: Rencontre[]

  match: Match;
  
  constructor() { }

  ngOnInit(): void {
    this.match = new Match(6);
  }

}
