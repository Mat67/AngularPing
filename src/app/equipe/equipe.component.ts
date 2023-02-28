import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Equipe } from '../model/equipe';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {
  @Input() equipe: Equipe;
  @Output() BlurMethod: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  onBlurMethod() {
    this.BlurMethod.emit()
  }

  setCaptain(joueurChoisit): void{
    this.equipe.joueurs.forEach(joueur => {
      if(joueur.position == joueurChoisit.position)
      {
        joueur.isCapitaine = !joueur.isCapitaine;
      }
      else
      {
        joueur.isCapitaine = false;
      }
    });

    this.onBlurMethod()
  }
}
