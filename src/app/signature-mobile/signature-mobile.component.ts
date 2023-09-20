import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { RepositoryService } from '../services/repository.service';
import { Match } from '../model/match';

@Component({
  selector: 'app-signature-mobile',
  templateUrl: './signature-mobile.component.html',
  styleUrls: ['./signature-mobile.component.css'],
})
export class SignatureMobileComponent {
  matchId: string;
  equipeId: string;
  match: Match
  nomEquipe: string
  resultat: string
  capitaine: string

  constructor(private route: ActivatedRoute, private repository: RepositoryService,) {

  }

  ngOnInit() {
    this.matchId = this.route.snapshot.paramMap.get('matchId');
    this.equipeId = this.route.snapshot.paramMap.get('equipeId');

    this.repository.getMatch(this.matchId).then(m => {
      this.match = m
    }).then(() => {
      this.repository.GetSignatures(this.matchId).then((s) => {
        if (this.equipeId === '0') {
          this.signature = s.signatureEquipeReceveuse
          this.nomEquipe = this.match.equipeReceveuse.nomEquipe
        }
        else if (this.equipeId === '1') {
          this.signature = s.signatureEquipeVisiteuse
          this.nomEquipe = this.match.equipeVisiteuse.nomEquipe
        }

        this.resultat = this.match.toString()
      })
    })


  }

  signatureChanged(base64data) {
    this.signature = base64data
  }


  validerSignature() {
    this.repository.ModifierSignature(this.matchId, this.equipeId, this.signature)
  }

  effacerSignature() {
    //this.repository.ModifierSignature(this.matchId, this.equipeId, null)
    this.signature = undefined
  }

  signature: string

}
