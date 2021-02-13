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
  signatureEquipeReceveuse = undefined
  signatureEquipeVisiteuse = undefined

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
    console.log(content)
    this.signatureEquipeReceveuse = content
  }

  saveImageEquipeVisiteuse (content) {
    console.log(content)
    this.signatureEquipeVisiteuse = content
  }

  isButtonImprimerActif() {
    return this.signatureEquipeReceveuse && this.signatureEquipeVisiteuse
  }

  imprimer() {
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
