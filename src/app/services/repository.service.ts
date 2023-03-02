import { Injectable } from '@angular/core';
import { delay, Observable, retryWhen, Subject, tap } from 'rxjs';
import { Match } from '../model/match';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

const CHAT_URL = 'ws://localhost:8999/';

export interface Message {
  author: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  public messages: Subject<Message>;

  getMatchsResolver: (value: unknown) => void;
  onMatchUpdate: (match: Match) => void;
  onError: (data) => void;
  ws: WebSocketSubject<unknown>;

  constructor() {
    const createWebSocket = (uri) => {
      return new Observable((observer) => {
        try {
          this.ws = webSocket(uri);
          const subscription = this.ws.asObservable().subscribe(
            (d: any) => {
              if (d.message === 'getMatchs') {
                if (this.getMatchsResolver) {
                  var matchs = [];

                  d.data.forEach((m) => {
                    matchs.push(Match.fabriqueMatch(m));
                  });

                  this.getMatchsResolver(matchs);
                }
              } else if (d.message === 'sauvegarderMatchResultat') {
                this.onMatchUpdate(Match.fabriqueMatch(d.data));
              }

              console.log('recu du serveur ' + d);
            },
            (error) => observer.error(error),
            () => observer.complete()
          );

          return () => {
            if (!subscription.closed) {
              subscription.unsubscribe();
            }
          };
        } catch (error) {
          observer.error(error);
          this.onError(error);
        }
      });
    };

    createWebSocket('ws://localhost:8999')
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            tap((err) => {
              this.onError(err);
            }),
            delay(5000)
          )
        )
      )
      .subscribe(
        (data) => console.log(data),
        (err) => console.error(err)
      );
  }

  sauvegarderMath(match: Match) {
    this.ws.next({ message: 'sauvegarderMatch', data: match });
    //   let matchsIds = this.getListeMatchesId()
    //   var matchTrouve = matchsIds.indexOf(match.id) !== -1;
    //   if (!matchTrouve){
    //     matchsIds.push(match.id);
    //     localStorage.setItem('eps-matchs', JSON.stringify(matchsIds));
    // }
    //   localStorage.setItem('eps-match-' + match.id, JSON.stringify(match))
  }

  chargeMatch(id: string) {
    //this.ws.next({ message: 'getMatch', data: id });
    //var obj = JSON.parse(localStorage.getItem('eps-match-' + id))
    //return Match.fabriqueMatch(obj)
  }

  supprimerMatch(id: string) {
    this.ws.next({ message: 'supprimerMatch', data: id });
  }

  getListeMatchesId() {
    var strMatches = localStorage.getItem('eps-matchs');
    if (!strMatches) return [];

    return JSON.parse(strMatches);
  }

  async listeMatchsSauvegardes(): Promise<Match[]> {
    this.ws.next({ message: 'getMatchs' });

    return await new Promise((resolve, reject) => {
      this.getMatchsResolver = resolve;

      setTimeout(() => reject('timeout'), 5000);
    });
  }
}
