import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../model/match';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RandomService } from '../services/random.service';
import { RencontreDouble } from '../model/rencontre';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css']
})
export class BottomBarComponent implements OnInit {
  @Input() match: Match;
  @Input() lectureSeule: boolean;
  @Input() godeMode: boolean;

  constructor(private repository: RepositoryService) { }

  ngOnInit(): void {
  }

  public imprimer() {
    window.print();
  }


  isButtonImprimerActif() {
    return this.match.matchEstTermine() 
    && this.match.signatureEquipeReceveuse != undefined 
    && this.match.signatureEquipeVisiteuse != undefined
  }


  public random() {
    var randomService = new RandomService;

    if (!this.match.equipeReceveuse.nomEquipe)
      this.match.equipeReceveuse.nomEquipe = randomService.getRandomString() + ' ' + randomService.random(1,5);
    if (!this.match.equipeVisiteuse.nomEquipe)
      this.match.equipeVisiteuse.nomEquipe = randomService.getRandomString() + ' ' + randomService.random(1,5);

    var randomJoueurs = (joueur) => {
      if (!joueur.nom)
        joueur.nom = randomService.getRandomString();

      if (!joueur.numeroLicence)
        joueur.numeroLicence = randomService.random(100000, 999999).toString();
      
      if (!joueur.classement)
        joueur.classement = randomService.random(0, 20).toString();
    }

    this.match.equipeReceveuse.joueurs.forEach(joueur => {
      randomJoueurs(joueur)    
    });

    this.match.equipeVisiteuse.joueurs.forEach(joueur => {
      randomJoueurs(joueur)
    });

    this.match.rencontres.forEach(rencontre => {
      rencontre.manches.forEach(manche => manche.score = '');

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
