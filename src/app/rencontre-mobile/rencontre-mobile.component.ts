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
        if (this.rencontre && this.rencontre.manches) {
            const scores = [
                { a: this.scoreA1, b: this.scoreB1 },
                { a: this.scoreA2, b: this.scoreB2 },
                { a: this.scoreA3, b: this.scoreB3 },
                { a: this.scoreA4, b: this.scoreB4 },
                { a: this.scoreA5, b: this.scoreB5 }
            ];

            scores.forEach((s, idx) => {
                if (this.rencontre.manches[idx] && s.a !== undefined && s.b !== undefined && s.a !== null && s.b !== null) {
                    this.rencontre.manches[idx].score = `${s.a}-${s.b}`;
                }
            });
        }

        if (this.match) {
            this.repository.sauvegarderMatch(this.match);
        }
    }
}
