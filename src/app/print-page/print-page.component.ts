import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../model/match';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.css']
})
export class PrintPageComponent implements OnInit {
  @Input() match: Match;
  signatureEquipeReceveuse: any;
  signatureEquipeVisiteuse: any;

  constructor(private repository: RepositoryService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.repository.GetSignatures(this.match.id).then((s) => {
      this.signatureEquipeReceveuse = s.signatureEquipeReceveuse
      this.signatureEquipeVisiteuse = s.signatureEquipeVisiteuse
    })
  }

  getDate() {
    // var date = this.match?.Date

    // return date.year

    return null;
  }

  getHeure() {

  }

}
