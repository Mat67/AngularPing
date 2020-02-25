import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../model/match';
import { RandomService } from '../services/random.service';
import { RencontreDouble } from '../model/rencontre-double';

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
  
  public random() {
    var randomService = new RandomService;

    this.match.equipeReceveuse.nomEquipe = randomService.getRandomString() + ' ' + randomService.random(1,5);
    this.match.equipeVisiteuse.nomEquipe = randomService.getRandomString() + ' ' + randomService.random(1,5);

    this.match.equipeReceveuse.joueurs.forEach(joueur => {
      joueur.nom = randomService.getRandomString();
      joueur.numeroLicence = randomService.random(100000, 999999).toString();
      joueur.classement = randomService.random(0, 20).toString();
    });
    this.match.equipeVisiteuse.joueurs.forEach(joueur => {
      joueur.nom = randomService.getRandomString();
      joueur.numeroLicence = randomService.random(100000, 999999).toString();
      joueur.classement = randomService.random(0, 20).toString();
    });

    this.match.rencontres.forEach(rencontre => {
      rencontre.manches.forEach(manche => {
        if (rencontre.getVainqueur() === '')
          manche.score = randomService.getRandomScore();

        if (rencontre instanceof RencontreDouble) {
          (rencontre as RencontreDouble).doubleEquipeReceveuse = randomService.getRandomString();
          (rencontre as RencontreDouble).doubleEquipeVisiteuse = randomService.getRandomString()
        }
      });
    });
  }
}
