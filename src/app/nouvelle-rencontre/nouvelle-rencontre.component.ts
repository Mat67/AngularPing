import { Component,  Input  } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { App } from '../model/app';
import { Match } from '../model/match';
import { RepositoryService } from '../services/repository.service';


@Component({
  selector: 'app-nouvelle-rencontre',
  templateUrl: './nouvelle-rencontre.component.html',
  styleUrls: ['./nouvelle-rencontre.component.css']
})
export class NouvelleRencontreComponent {
  @Input() app: App;

  constructor(private modalService: NgbModal, private repository: RepositoryService, private router: Router) { }

  openNouvelleRencontre(content) {
    this.modalService.open(content, { size: 'md', centered: true }).result.then((result) => {
      if (!isNaN(result))
        this.creerNouvelleRencontre(+result)
    }, (reason) => {
      ///this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public async creerNouvelleRencontre(nombreJoueur) {
    var match = Match.fabriqueMatch(nombreJoueur);

    try {
      await Promise.race([
        this.repository.sauvegarderMatch(match),
        new Promise((r) => setTimeout(r, 2000))
      ]);
    } catch (e) {
      console.warn('Sauvegarde WebSocket non confirmée, navigation poursuivie', e);
    }

    this.router.navigate(['/matchs/' + match.id]);
  }
}
