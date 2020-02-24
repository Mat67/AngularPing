import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../model/match';

@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.css']
})
export class EnteteComponent implements OnInit {
  @Input() match: Match;

  constructor() { }

  ngOnInit(): void {
  }

}
