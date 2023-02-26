import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { App } from '../model/app';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Input() app: App;
  @ViewChild('contentNouvelleRencontre', { static: true }) content: TemplateRef<any>;
  closeResult: string;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    if (!this.app.match) {
      //this.openNouvelleRencontre(this.content);
    }
  }

  openNouvelleRencontre(content) {
    this.modalService.open(content, { size: 'md', centered: true }).result.then((result) => {
      this.app.creerNouvelleRencontre(+result)
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
