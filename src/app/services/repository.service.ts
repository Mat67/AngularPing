import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Match } from '../model/match';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

const CHAT_URL = "ws://localhost:8999/";

export interface Message {
  author: string;
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  public messages: Subject<Message>;
  private ws: WebSocketSubject<unknown>

  getMatchsResolver: (value: unknown) => void;
  onMatchUpdate: (match: Match) => void;

  constructor() {
    this.ws = webSocket('ws://localhost:8999');
    this.ws.subscribe((d:any) => {
      if (d.message === 'getMatchs') {
        if (this.getMatchsResolver) {
          var matchs = []

          d.data.forEach(m => {
            matchs.push(Match.fabriqueMatch(m))
          })

          this.getMatchsResolver(matchs)
        }
      }
      else if (d.message === 'sauvegarderMatch') {
        this.onMatchUpdate(Match.fabriqueMatch(d.data))
      }
      console.log('recu du serveur ' + d)
    })
  }


  sauvegarderMath(match:Match) {
    this.ws.next({ message: 'sauvegarderMatch', data: match })


  //   let matchsIds = this.getListeMatchesId()

  //   var matchTrouve = matchsIds.indexOf(match.id) !== -1;
  //   if (!matchTrouve){
  //     matchsIds.push(match.id);
  //     localStorage.setItem('eps-matchs', JSON.stringify(matchsIds));

  // }


  //   localStorage.setItem('eps-match-' + match.id, JSON.stringify(match))
  }

  chargeMatch(id:string) {
    this.ws.next({ message: 'getMatch', data: id })


    //var obj = JSON.parse(localStorage.getItem('eps-match-' + id))
    //return Match.fabriqueMatch(obj)
  }

  supprimerMatch(id:string) {
    this.ws.next({ message: 'getMatch', data: id })
  }

  getListeMatchesId() {
    var strMatches = localStorage.getItem('eps-matchs')
    if (!strMatches)
      return []

    return JSON.parse(strMatches)
  }

  async listeMatchsSauvegardes() : Promise<Match[]>   {
    this.ws.next({ message: 'getMatchs' })


    return await new Promise((resolve, reject) => {
      this.getMatchsResolver = resolve

      setTimeout(() => reject('timeout'), 5000)
    })




    // var tmpMatchs = []
    // var matchsResult = []
    // try {
    //   tmpMatchs = this.getListeMatchesId()

    //   if (tmpMatchs)
    //     tmpMatchs.forEach(match => {
    //       matchsResult.push(this.chargeMatch(match))
    //     });
    // } catch (error) {
    //   console.error(error)
    //   tmpMatchs = []
    // }

    // return matchsResult
  }
}
