import { Injectable } from '@angular/core';
import { delay, Observable, retryWhen, Subject, tap } from 'rxjs';
import { Match } from '../model/match';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Joueur } from '../model/joueur';

const WS_URL = 'wss://serveur-mat.synology.me:8989';
//const WS_URL = 'ws://localhost:8999';

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
  onSignatureUpdate: (signature: any) => void;
  getSignaturesResolver: (signatures: any) => void;
  onError: (data) => void;
  ws: WebSocketSubject<unknown>;
  getMatchResolver: (match: Match) => void;
  sauvegarderMatchResolver: (value: unknown) => void;
  getAllJoueursResolver: (value: Joueur[]) => void;
  getAllEquipesResolver: (value: string[]) => void;

  constructor() {
    const createWebSocket = (uri) => {
      return new Observable((observer) => {
        try {
          this.ws = webSocket(uri);
          const subscription = this.ws.asObservable().subscribe(
            (d: any) => {
              if (d.message === 'getMatchsResult') {
                if (this.getMatchsResolver) {
                  var matchs = [];

                  d.data.forEach((m) => {
                    matchs.push(Match.fabriqueMatch(m));
                  });

                  this.getMatchsResolver(matchs);
                }

              } else if (d.message === 'getMatchResult') {
                if (this.getMatchResolver) {
                  var m = Match.fabriqueMatch(d.data)

                  this.getMatchResolver(m);
                }
              } else if (d.message === 'sauvegarderMatchResultat') {
                if (this.sauvegarderMatchResolver) {
                  this.sauvegarderMatchResolver(d.data)
                  this.sauvegarderMatchResolver = undefined

                }
                this.onMatchUpdate(Match.fabriqueMatch(d.data));
              } else if (d.message === 'ModifierSignatureResultat') {
                var signature = {
                  matchId:d.data.matchId,
                  equipeId:d.data.equipeId,
                  signature: d.data.signature,
                }
                if (this.onSignatureUpdate)
                  this.onSignatureUpdate(signature);
              }
              else if (d.message === 'getSignaturesResultat') {
                this.getSignaturesResolver(d.data);
              }
              else if (d.message === 'getAllJoueursResult') {
                var joueurs = [];

                  d.data.forEach((j) => {
                    joueurs.push(Joueur.fabrique(j));
                  });

                
                this.getAllJoueursResolver(joueurs);
              }
              else if (d.message === 'getAllEquipesResult') {
                var equipes = d.data;                
                this.getAllEquipesResolver(equipes.map(e => e.nomEquipe));
              }

              console.log('recu du serveur ' + d.message);
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

    createWebSocket(WS_URL)
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

  async sauvegarderMath(match: Match) {
    this.ws.next({ message: 'sauvegarderMatch', data: match });


    return await new Promise((resolve, reject) => {
      this.sauvegarderMatchResolver = resolve;

      setTimeout(() => reject('timeout'), 50000);
    });


    //   let matchsIds = this.getListeMatchesId()
    //   var matchTrouve = matchsIds.indexOf(match.id) !== -1;
    //   if (!matchTrouve){
    //     matchsIds.push(match.id);
    //     localStorage.setItem('eps-matchs', JSON.stringify(matchsIds));
    // }
    //   localStorage.setItem('eps-match-' + match.id, JSON.stringify(match))
  }

  async getMatch(id: string) : Promise<Match> {
    this.ws.next({ message: 'getMatch', data : id });

    return await new Promise((resolve, reject) => {
      this.getMatchResolver = resolve;

      setTimeout(() => reject('timeout'), 5000);
    });
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

  ModifierSignature( matchId: string, equipeId: string, signature: any) {
    var data = {
      matchId: matchId,
      equipeId: equipeId,
      signature: signature
    }

    this.ws.next({ message: 'ModifierSignature', data: data });
  }

  async GetSignatures( matchId: string): Promise<any>  {
    this.ws.next({ message: 'getSignatures', data: matchId });

    return await new Promise((resolve, reject) => {
      this.getSignaturesResolver = resolve;

      setTimeout(() => reject('timeout'), 5000);
    });
  }

  async getAllJoueurs() : Promise<Joueur[]> {
    this.ws.next({ message: 'getAllJoueurs' });

    return await new Promise((resolve, reject) => {
      this.getAllJoueursResolver = resolve;

      setTimeout(() => reject('timeout'), 5000);
    });
  }

  async getAllEquipes() : Promise<string[]> {
    this.ws.next({ message: 'getAllEquipes' });

    return await new Promise((resolve, reject) => {
      this.getAllEquipesResolver = resolve;

      setTimeout(() => reject('timeout'), 5000);
    });
  }
}
