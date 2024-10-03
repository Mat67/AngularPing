import { Component, OnInit } from '@angular/core';
import { Match } from '../model/match';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../services/repository.service';
import { Rencontre } from '../model/rencontre';

@Component({
    selector: 'app-rencontre-mobile',
    templateUrl: './rencontre-mobile.component.html',
    styleUrls: ['./rencontre-mobile.component.css']
})
export class RencontreMobileComponent implements OnInit {
    matchId: string;
    equipeId: string;
    rencontreId: string;
    match: Match
    nomEquipe: string
    resultat: string
    capitaine: string
    rencontre:Rencontre
    constructor(private route: ActivatedRoute, private repository: RepositoryService,) {
            
    }
    
    ngOnInit() {
        this.matchId = this.route.snapshot.paramMap.get('matchId');
        this.rencontreId = this.route.snapshot.paramMap.get('rencontreId');
    
        this.repository.getMatch(this.matchId).then(m => {
          this.match = m
          this.rencontre = m.rencontres[this.rencontreId]
        }).then(() => {
        
        })
    
    }
    // Variables pour les scores
    scoreA1: number;
    scoreB1: number;
    scoreA2: number;
    scoreB2: number;
    scoreA3: number;
    scoreB3: number;
    scoreA4: number;
    scoreB4: number;
    scoreA5: number;
    scoreB5: number;


    onSubmit() {
        // Logic pour traiter les résultats du match
        const result = {
            joueur1: {
                manche1: this.scoreA1,
                manche2: this.scoreA2,
                manche3: this.scoreA3,
                manche4: this.scoreA4,
                manche5: this.scoreA5
            },
            joueur2: {
                manche1: this.scoreB1,
                manche2: this.scoreB2,
                manche3: this.scoreB3,
                manche4: this.scoreB4,
                manche5: this.scoreB5
            }
        };

        console.log('Résultat du match:', result);
        // Tu peux ensuite envoyer ces données à un service, les stocker, etc.
    }
}
