import { Component, OnInit } from '@angular/core';
import { App } from '../model/app';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {
  app: App;

  constructor(private repository: RepositoryService) {
    this.app = new App()
   }

  ngOnInit(): void {

  }

  onBlurMethod() {
    this.repository.sauvegarderMath(this.app.match)
  }

  afficher() {
    return this.app.match
  }
}
