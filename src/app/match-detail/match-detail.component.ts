import { Component, OnInit } from '@angular/core';
import { App } from '../model/app';
import { RepositoryService } from '../services/repository.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {
  app: App;
  onBlurMethod: any;

  constructor(private repository: RepositoryService) {
    this.app = new App()
    this.onBlurMethod = _.debounce(() => {
      console.log("sauvegarde")
      this.repository.sauvegarderMath(this.app.match)
    }, 2000)
   }

  ngOnInit(): void {

  }



  afficher() {
    return this.app.match
  }
}

