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

                  const rawItems = Array.isArray(d.data) ? d.data : (d.data?.items || []);
                  const totalCount = Array.isArray(d.data) ? d.data.length : (d.data?.totalCount ?? rawItems.length);
                  const page = d.data?.page ?? 1;
                  const pageSize = d.data?.pageSize ?? 5;

                  rawItems.forEach((m) => {
                    matchs.push(Match.fabriqueMatch(m));
                  });

                  this.getMatchsResolver({ matchs, totalCount, page, pageSize });
                  this.getMatchsResolver = undefined;
                }

              } else if (d.message === 'getMatchResult') {
                if (this.getMatchResolver) {
                  var m = Match.fabriqueMatch(d.data)

                  this.getMatchResolver(m);
                  this.getMatchResolver = undefined;
                }
              } else if (d.message === 'sauvegarderMatchResultat') {
                if (this.sauvegarderMatchResolver) {
                  this.sauvegarderMatchResolver(d.data)
                  this.sauvegarderMatchResolver = undefined
                }
                if (this.onMatchUpdate) {
                  this.onMatchUpdate(Match.fabriqueMatch(d.data));
                }
              } else if (d.message === 'ModifierSignatureResultat') {
                var signature = {
                  matchId:d.data?.matchId,
                  equipeId:d.data?.equipeId,
                  signature: d.data?.signature,
                }
                if (this.onSignatureUpdate)
                  this.onSignatureUpdate(signature);
              }
              else if (d.message === 'getSignaturesResultat') {
                if (this.getSignaturesResolver) {
                  this.getSignaturesResolver(d.data);
                  this.getSignaturesResolver = undefined;
                }
              }
              else if (d.message === 'getAllJoueursResult') {
                if (this.getAllJoueursResolver) {
                  var joueurs = [];
                  d.data?.forEach((j) => {
                    joueurs.push(Joueur.fabrique(j));
                  });
                  this.getAllJoueursResolver(joueurs);
                  this.getAllJoueursResolver = undefined;
                }
              }
              else if (d.message === 'getAllEquipesResult') {
                if (this.getAllEquipesResolver) {
                  var equipes = d.data || [];
                  this.getAllEquipesResolver(equipes.map(e => e.nomEquipe));
                  this.getAllEquipesResolver = undefined;
                }
              }

              console.log('recu du serveur ' + d.message);
            },
            (error) => {
              if (this.onError) this.onError(error);
              observer.error(error);
            },
            () => observer.complete()
          );

          return () => {
            if (!subscription.closed) {
              subscription.unsubscribe();
            }
          };
        } catch (error) {
          if (this.onError) this.onError(error);
          observer.error(error);
        }
      });
    };

    createWebSocket(WS_URL)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            tap((err) => {
              if (this.onError) this.onError(err);
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

  async sauvegarderMatch(match: Match) {
    if (this.ws) {
      this.ws.next({ message: 'sauvegarderMatch', data: match });
    }

    return await new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.sauvegarderMatchResolver = undefined;
        reject('timeout');
      }, 50000);

      this.sauvegarderMatchResolver = (val) => {
        clearTimeout(timer);
        resolve(val);
      };
    });
  }

  async sauvegarderMath(match: Match) {
    return this.sauvegarderMatch(match);
  }

  async getMatch(id: string) : Promise<Match> {
    if (this.ws) {
      this.ws.next({ message: 'getMatch', data : id });
    }

    return await new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.getMatchResolver = undefined;
        reject('timeout');
      }, 5000);

      this.getMatchResolver = (val) => {
        clearTimeout(timer);
        resolve(val);
      };
    });
  }

  supprimerMatch(id: string) {
    if (this.ws) {
      this.ws.next({ message: 'supprimerMatch', data: id });
    }
  }

  getListeMatchesId() {
    var strMatches = localStorage.getItem('eps-matchs');
    if (!strMatches) return [];

    return JSON.parse(strMatches);
  }

  async listeMatchsSauvegardes(page: number = 1, pageSize: number = 5): Promise<{ matchs: Match[], totalCount: number, page: number, pageSize: number }> {
    if (this.ws) {
      this.ws.next({ message: 'getMatchs', data: { page, pageSize } });
    }

    return await new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.getMatchsResolver = undefined;
        reject('timeout');
      }, 5000);

      this.getMatchsResolver = (val: any) => {
        clearTimeout(timer);
        resolve(val);
      };
    });
  }

  ModifierSignature( matchId: string, equipeId: string, signature: any) {
    var data = {
      matchId: matchId,
      equipeId: equipeId,
      signature: signature
    }

    if (this.ws) {
      this.ws.next({ message: 'ModifierSignature', data: data });
    }
  }

  async GetSignatures( matchId: string): Promise<any>  {
    if (this.ws) {
      this.ws.next({ message: 'getSignatures', data: matchId });
    }

    return await new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.getSignaturesResolver = undefined;
        reject('timeout');
      }, 5000);

      this.getSignaturesResolver = (val) => {
        clearTimeout(timer);
        resolve(val);
      };
    });
  }

  async getAllJoueurs() : Promise<Joueur[]> {
    if (this.ws) {
      this.ws.next({ message: 'getAllJoueurs' });
    }

    return await new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.getAllJoueursResolver = undefined;
        reject('timeout');
      }, 5000);

      this.getAllJoueursResolver = (val) => {
        clearTimeout(timer);
        resolve(val);
      };
    });
  }

  async getAllEquipes() : Promise<string[]> {
    if (this.ws) {
      this.ws.next({ message: 'getAllEquipes' });
    }

    return await new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.getAllEquipesResolver = undefined;
        reject('timeout');
      }, 5000);

      this.getAllEquipesResolver = (val) => {
        clearTimeout(timer);
        resolve(val);
      };
    });
  }
}
