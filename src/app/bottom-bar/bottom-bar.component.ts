import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../model/match';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css']
})
export class BottomBarComponent implements OnInit {
  @Input() match: Match;

  constructor() { }

  ngOnInit(): void {
  }

}
