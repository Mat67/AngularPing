import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {
  matchs = []
  

  constructor() {
    
   }

  ngOnInit(): void {

    //var matchs = [];
  for (let index = 0; index < 10; index++) {
      var match = {
        resultat: index,
        joueur1: {nom: 'A' + index},
        joueur2: {nom: 'B' + index},
      };
      this.matchs.push(match);
  };
    
  }


  
}
