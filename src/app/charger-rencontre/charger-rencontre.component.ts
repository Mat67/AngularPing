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

  public afficheDateDepuis(date) {

    if (date) {
      var d = moment(new Date(date?.year, date?.month - 1, date?.day))
      return d.locale('fr').fromNow();
    } else
      return ''

  }
}
