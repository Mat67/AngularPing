import { Injectable } from '@angular/core';
import { Match } from '../model/match';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  constructor() { }


  sauvegarderMath(match:Match) {
    var matchs = this.listeMatchsSauvegardes()
    if (!matchs) {
      matchs = []
    }

    if (!matchs.find(x => x === match.id)){
      matchs.push(match.id)
      localStorage.setItem('eps-matchs', JSON.stringify(matchs))

  }

    localStorage.setItem('eps-match-' + match.id, JSON.stringify(match))
  }

  chargeMatch(id:string) {
    return JSON.parse(localStorage.getItem('eps-match-' + id))
  }

  listeMatchsSauvegardes() {
    var tmpMatchs = []
    var matchsResult = []
    try {
      tmpMatchs = JSON.parse(localStorage.getItem('eps-matchs'))
    } catch (error) {
      console.error(error)
      tmpMatchs = []
    }

    tmpMatchs.forEach(match => {
      matchsResult.push(this.chargeMatch(match.id))
    });

    return matchsResult
  }
}
