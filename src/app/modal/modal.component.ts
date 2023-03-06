import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
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

  @ViewChild('signature') public signaturePad: SignaturePadComponent;

  signaturePadOptions: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
    minWidth: 5,
    canvasWidth: 300,
    canvasHeight: 300
  };

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    // this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    // this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  open(content) {
    this.modalService.open(content, { size: 'xl', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  saveImageEquipeReceveuse(base64data) {
    this.match.signatureEquipeReceveuse = base64data
  }

  saveImageEquipeVisiteuse (base64data) {
    this.match.signatureEquipeVisiteuse = base64data
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
