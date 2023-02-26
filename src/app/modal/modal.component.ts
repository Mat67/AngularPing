import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Match } from '../model/match';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() match: Match;

  closeResult: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content, { size: 'xl', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  saveImageEquipeReceveuse(content) {
    var match = this.match

    var reader = new FileReader();
    reader.readAsDataURL(content);
    reader.onloadend = function() {
        var base64data = reader.result;
        match.signatureEquipeReceveuse = base64data
    }
  }

  saveImageEquipeVisiteuse (content) {
    var match = this.match

    var reader = new FileReader();
    reader.readAsDataURL(content);
    reader.onloadend = function() {
        var base64data = reader.result;
        match.signatureEquipeVisiteuse = base64data
    }
  }

  isButtonImprimerActif() {
    return this.match.signatureEquipeReceveuse && this.match.signatureEquipeVisiteuse
  }

  Imprimer() {
    this.modalService.dismissAll()
    window.print()
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
