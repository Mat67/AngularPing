import { Component,  Input  } from '@angular/core';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { App } from '../model/app';


@Component({
  selector: 'app-nouvelle-rencontre',
  templateUrl: './nouvelle-rencontre.component.html',
  styleUrls: ['./nouvelle-rencontre.component.css']
})
export class NouvelleRencontreComponent {
  @Input() app: App;

  constructor(private modalService: NgbModal) { }

  openNouvelleRencontre(content) {
    this.modalService.open(content, { size: 'md', centered: true }).result.then((result) => {
      if (!isNaN(result))
        this.app.creerNouvelleRencontre(+result)
    }, (reason) => {
      ///this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
