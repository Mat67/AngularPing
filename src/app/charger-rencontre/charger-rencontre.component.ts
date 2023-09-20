import { Component,  Input  } from '@angular/core';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { App } from '../model/app';
import { Match } from '../model/match';
import { RepositoryService } from '../services/repository.service';


@Component({
  selector: 'app-charger-rencontre',
  templateUrl: './charger-rencontre.component.html',
  styleUrls: ['./charger-rencontre.component.css']
})
export class ChargerRencontreComponent {
  @Input() app: App;
  matchs: Match[];

  constructor(private modalService: NgbModal, private repository: RepositoryService) {

  }



  async openChargerRencontre(content) {
    this.matchs = await this.repository.listeMatchsSauvegardes()



    this.modalService.open(content, { size: 'md', centered: true }).result.then((result) => {

    }, (reason) => {
    });
  }

  public onClick(match:Match) {
    if (this.matchs.find(m => m.id === match.id)) {
      this.app.match = match
      this.modalService.dismissAll()
    }
  }

  public async supprimer(match:Match) {
    this.repository.supprimerMatch(match.id)

    this.matchs = await this.repository.listeMatchsSauvegardes()
  }

  public afficheDateDepuis(match:Match) {

    if (match && match.Date) {
      var tmpDate


      tmpDate = new Date(match.Date)
      var tmpHeure =
      tmpHeure = match.Heure


      var d = moment(new Date(tmpDate.getFullYear(), tmpDate.getMonth() - 1, tmpDate.getDate(), tmpHeure ? tmpHeure.hour : 0, tmpHeure ? tmpHeure.minute : 0))
      return d.locale('fr').fromNow();
    } else
      return ''

  }
}
