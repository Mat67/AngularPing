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
    try {
      return JSON.parse(localStorage.getItem('eps-matchs'))
    } catch (error) {
      console.error(error)
    }

    return []
  }
}
