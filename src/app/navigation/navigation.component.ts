import { Component,  Input  } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { App } from '../model/app';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Input() app: App;

  constructor(private modalService: NgbModal) { }




  openChargerRencontre(content) {
    this.modalService.open(content, { size: 'md', centered: true }).result.then((result) => {

    }, (reason) => {

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
}
