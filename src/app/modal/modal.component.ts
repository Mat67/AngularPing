import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Match } from '../model/match';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() match: Match;

  signatureEquipeReceveuse:string
  signatureEquipeVisiteuse:string

  closeResult: string;

  constructor(private modalService: NgbModal, private repository: RepositoryService) {
    repository.onSignatureUpdate = (data) => {
      if (this.match.id === data.matchId) {
        if (data.equipeId === '0')
          this.signatureEquipeReceveuse = data.signature
        else if (data.equipeId === '1')
          this.signatureEquipeVisiteuse = data.signature
      }
    }
  }

  signatureEquipeReceveuseMiseAJour() {

  }
  signatureEquipeVisiteuseMiseAJour() {

  }

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
    this.repository.GetSignatures(this.match.id).then((s) => {
      this.signatureEquipeReceveuse = s.signatureEquipeReceveuse
      this.signatureEquipeVisiteuse = s.signatureEquipeVisiteuse
    })

    this.modalService.open(content, { size: 'xl', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  saveImageEquipeReceveuse(base64data) {
    this.repository.ModifierSignature(this.match.id, '0', base64data)
  }

  saveImageEquipeVisiteuse (base64data) {
    this.repository.ModifierSignature(this.match.id, '1', base64data)
  }

  isButtonImprimerActif() {
    return this.match.signatureEquipeReceveuse && this.match.signatureEquipeVisiteuse
  }

  getQRCodeSignatureUrlEquipeReceveuse() {
    //return 'http://serveur-mat.synology.me:8999/matchs/' + this.match.id + '/equipes/0'
    return this.getQRCodeUrlSignature('0')
  }

  private getQRCodeUrlSignature(equipeId) {
    //return 'http://serveur-mat.synology.me:8999/matchs/' + this.match.id + '/equipes/0'
    return 'http://localhost:4200/matchs/' + this.match.id + '/equipes/' + equipeId + '/signature'
  }

  getQRCodeSignatureUrlEquipeVisiteuse() {
    //return 'http://serveur-mat.synology.me:8999/matchs/' + this.match.id + '/equipes/0'
    return this.getQRCodeUrlSignature('1')
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
