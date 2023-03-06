import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Match } from '../model/match';

@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.css'],
})
export class EnteteComponent implements OnInit {
  @Input() match: Match;
  @Output() BlurMethod: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onBlurMethod() {
    this.BlurMethod.emit()
  }
}
