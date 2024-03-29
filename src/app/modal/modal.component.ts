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
  @Input() godeMode: boolean

  signatureEquipeReceveuse:string
  signatureEquipeVisiteuse:string

  closeResult: string;

  constructor(private modalService: NgbModal, private repository: RepositoryService) {
   
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
    this.modalService.open(content, { size: 'xl', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  saveImageEquipeReceveuse(base64data) {
    this.repository.ModifierSignature(this.match.id, '0', base64data)
    this.match.signatureEquipeReceveuse = base64data
  }

  saveImageEquipeVisiteuse (base64data) {
    this.repository.ModifierSignature(this.match.id, '1', base64data)
    this.match.signatureEquipeVisiteuse = base64data
  }

  isButtonImprimerActif() {
    return (
      this.match.signatureEquipeReceveuse !== undefined &&
      this.match.signatureEquipeVisiteuse !== undefined
    );
  }

  supprimerSignatureEquipeReceveuse() {
    this.match.signatureEquipeReceveuse = undefined
    this.repository.ModifierSignature(this.match.id, '1', this.match.signatureEquipeReceveuse )
  }

  supprimerSignatureEquipeVisiteuse() {
    this.match.signatureEquipeVisiteuse = undefined
    this.repository.ModifierSignature(this.match.id, '1', this.match.signatureEquipeVisiteuse)
  }

  getQRCodeSignatureUrlEquipeReceveuse() {
    return this.getQRCodeUrlSignature('0')
  }

  private getQRCodeUrlSignature(equipeId) {
    return 'http://serveur-mat.synology.me/#/matchs/' + this.match.id + '/equipes/' + equipeId + '/signature'
    //return 'http://localhost:4200/matchs/' + this.match.id + '/equipes/' + equipeId + '/signature'
  }

  getQRCodeSignatureUrlEquipeVisiteuse() {
    return this.getQRCodeUrlSignature('1')
  }

  Imprimer() {
    this.repository.GetSignatures(this.match.id).then((s) => {
      this.signatureEquipeReceveuse = s.signatureEquipeReceveuse
      this.signatureEquipeVisiteuse = s.signatureEquipeVisiteuse
    })


    this.modalService.dismissAll()
    window.print()
  }


  peutSigner() {
    return this.match.matchEstTermine() && this.match.signatureEquipeReceveuse == undefined && this.match.signatureEquipeVisiteuse == undefined
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
