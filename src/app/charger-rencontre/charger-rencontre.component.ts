import { Component,  Input  } from '@angular/core';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { App } from '../model/app';

@Component({
  selector: 'app-charger-rencontre',
  templateUrl: './charger-rencontre.component.html',
  styleUrls: ['./charger-rencontre.component.css']
})
export class ChargerRencontreComponent {
  @Input() app: App;

  constructor(private modalService: NgbModal) { }

  openChargerRencontre(content) {
    this.modalService.open(content, { size: 'md', centered: true }).result.then((result) => {

    }, (reason) => {
    });
  }
}
