import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';

@Component({
  selector: 'app-champ-signature',
  template: '<signature-pad #signature [options]="signaturePadOptions" (drawEnd)="drawComplete($event)" ></signature-pad>'
})

export class ChampSignatureComponent implements AfterViewInit {

  @ViewChild('signature')
  public signaturePad: SignaturePadComponent;

  @Input() signature: string;

  ngOnChanges(changes: SimpleChanges) {

    if (this.signaturePad) {
      if (!changes?.signature?.currentValue)
        this.signaturePad.clear()
      else 
        this.signaturePad.fromDataURL(changes.signature.currentValue)
    }
      
    //this.doSomething(changes.categoryId.currentValue);
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values

}
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
    if (this.signaturePad) {
      this.signaturePad.set('minWidth', 5);
      this.signaturePad.clear();
      if (this.signature) {
        this.signaturePad.fromDataURL(this.signature);
      }
    }
  }

  drawComplete(event: MouseEvent | Touch) {
    this.onSignatureChanged.emit(this.signaturePad.toDataURL())
  }
}
