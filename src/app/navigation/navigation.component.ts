import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Match } from '../model/match';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Input() contexte: Match[];

  closeResult: string;
  constructor(private modalService: NgbModal) { }

  openNouvelleRencontre(content) {
    this.modalService.open(content, { size: 'md', centered: true }).result.then((result) => {
      this.contexte.length = 0
      this.contexte.push(new Match(+result))
    }, (reason) => {
      ///this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openChargerRencontre(content) {
    this.modalService.open(content, { size: 'md', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'BACKDROP_CLICK';
    } else {
      return  `reason`;
    }
  }

  nouvelleFeuille(nombreJoueurs) {
    var a = ''
  }
}
