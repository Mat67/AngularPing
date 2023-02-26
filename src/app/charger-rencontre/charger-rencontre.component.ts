import { Component,  Input  } from '@angular/core';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private modalService: NgbModal, private repository: RepositoryService) { }



  openChargerRencontre(content) {
    this.matchs = this.repository.listeMatchsSauvegardes()

    this.modalService.open(content, { size: 'md', centered: true }).result.then((result) => {

    }, (reason) => {
    });
  }
}
