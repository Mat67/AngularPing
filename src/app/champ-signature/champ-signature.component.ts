import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';
import { Match } from '../model/match';

@Component({
  selector: 'app-champ-signature',
  template: '<signature-pad #signature [options]="signaturePadOptions" (drawEnd)="drawComplete($event)"></signature-pad>'
})

export class ChampSignatureComponent implements AfterViewInit {

  @ViewChild('signature')
  public signaturePad: SignaturePadComponent;

  @Input() signature: string;


  @Output() onSignatureChanged: EventEmitter<String> = new EventEmitter<string>();


  signaturePadOptions: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
    minWidth: 5,
    canvasWidth: 500,
    canvasHeight: 300
  };

  constructor() {
    // no-op
  }
  ngOnInit(): void {

  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    this.signaturePad.fromDataURL(this.signature)
  }

  drawComplete(event: MouseEvent | Touch) {
    this.onSignatureChanged.emit(this.signaturePad.toDataURL())
  }
}
