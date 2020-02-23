import { Joueur } from './joueur';

export class Equipe {
    constructor(nombreJoueurs: number, equipeAX:string) {
        this.joueurs = new Array();
        
        for (let index = 0; index < nombreJoueurs; index++) {
            this.joueurs.push(new Joueur(this.getLettreAlphabet(equipeAX, index)));
        }
    }

    joueurs: Joueur[];
    nomEquipe:string;

    public getJoueurByPosition(position:string) {
        return this.joueurs.find(function (j) {
            return j.position === position;
        });
    }

    private getLettreAlphabet(lettre:string, position:number) {
        return String.fromCharCode(lettre.charCodeAt(0) + position);
    }
}
