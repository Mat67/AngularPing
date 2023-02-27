import { Injectable } from '@angular/core';
import { Match } from '../model/match';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  constructor() { }


  sauvegarderMath(match:Match) {
    let matchsIds = this.getListeMatchesId()

    var matchTrouve = matchsIds.indexOf(match.id) !== -1;
    if (!matchTrouve){
      matchsIds.push(match.id);
      localStorage.setItem('eps-matchs', JSON.stringify(matchsIds));

  }

    localStorage.setItem('eps-match-' + match.id, JSON.stringify(match))
  }

  chargeMatch(id:string) {
    var obj = JSON.parse(localStorage.getItem('eps-match-' + id))
    return Match.fabriqueMatch(obj)
  }

  getListeMatchesId() {
    var strMatches = localStorage.getItem('eps-matchs')
    if (!strMatches)
      return []

    return JSON.parse(strMatches)
  }

  listeMatchsSauvegardes() : Match[]  {
    var tmpMatchs = []
    var matchsResult = []
    try {
      tmpMatchs = this.getListeMatchesId()

      if (tmpMatchs)
        tmpMatchs.forEach(match => {
          matchsResult.push(this.chargeMatch(match))
        });
    } catch (error) {
      console.error(error)
      tmpMatchs = []
    }

    return matchsResult
  }
}
