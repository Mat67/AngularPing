import { Joueur } from './joueur';

export class Equipe {
    constructor(nombreJoueurs: number) {
        this.joueurs = new Array();
        
        for (let index = 0; index < nombreJoueurs; index++) {
            this.joueurs.push(new Joueur());
            
        }
    }

    joueurs: Joueur[];
}
