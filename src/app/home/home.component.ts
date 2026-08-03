import { Component, Input, OnInit } from '@angular/core';
import { App } from '../model/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() app: App;

  constructor() { }

  ngOnInit(): void {
  }

}
