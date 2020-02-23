import { Joueur } from './joueur';

export class Equipe {
    constructor(nombreJoueurs: number, equipeAX:string) {
        this.joueurs = new Array();
        
        for (let index = 0; index < nombreJoueurs; index++) {
            this.joueurs.push(new Joueur(index, equipeAX));
        }
    }

    joueurs: Joueur[];

    public getJoueurById(id:string) {
        return this.joueurs.find(function (j) {
            return j.id === id;
        });
    }
}
