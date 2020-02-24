import { Component, OnInit, Input } from '@angular/core';
import { Equipe } from '../model/equipe';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {
  @Input() equipe: Equipe;

  constructor() { }

  ngOnInit(): void {}
}
