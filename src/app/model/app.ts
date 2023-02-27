import { Match } from './match';

export class App {
  constructor() {

  }

  match: Match


  public creerNouvelleRencontre(nombreJoueur) {
    this.match = Match.fabriqueMatch(nombreJoueur)

  }
}
