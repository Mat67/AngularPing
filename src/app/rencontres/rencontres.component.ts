import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rencontres',
  templateUrl: './rencontres.component.html',
  styleUrls: ['./rencontres.component.css']
})
export class RencontresComponent implements OnInit {
  rencontres = [];
  constructor() { }

  ngOnInit(): void {
    for (let index = 0; index < 10; index++) {
      var rencontre = {
        resultat: index,
        joueur1: {nom: 'A' + index},
        joueur2: {nom: 'B' + index},
      };
      this.rencontres.push(rencontre);
    };
  }

}
