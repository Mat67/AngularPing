import { Joueur } from './joueur';

export class Equipe {
    constructor(nombreJoueurs: number) {
        this.joueurs = new Array(nombreJoueurs).fill(new Joueur());
    }

    joueurs: Joueur[];
}
