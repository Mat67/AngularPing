import { Component, OnInit, Input } from '@angular/core';
import { LanguageServiceMode } from 'typescript';
import { Equipe } from '../model/equipe';
import { Joueur } from '../model/joueur';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {
  @Input() equipe: Equipe;

  constructor() { }

  ngOnInit(): void {

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
  }
}
