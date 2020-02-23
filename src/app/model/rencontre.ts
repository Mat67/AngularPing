import { Joueur } from './joueur';
import { Manche } from './manche';

export class Rencontre {
    constructor() {
        this.manches = new Array();

        for (let index = 0; index < 5; index++) {
            this.manches.push(new Manche());
        }
    }
    
    manches: Manche[] = new Array
    positionJoueurEquipeReceveuse:string;
    positionJoueurEquipeVisiteuse:string;

    public getVainqueur():string {
        var nbManchesAGagner = Math.trunc(this.manches.length / 2) + 1;
        var score = 0;
        var nbMancheJouees = 0;

        this.manches.forEach(manche => {
            if (manche.getResultat() < 0) {
                score--;
                nbMancheJouees++;
            }
            else if (manche.getResultat() > 0) {
                score++;
                nbMancheJouees++;
            }
        });

        if (nbMancheJouees < nbManchesAGagner)
            return '';

        if (score > 0)
            return this.positionJoueurEquipeReceveuse;
        else if (score < 0)
            return this.positionJoueurEquipeVisiteuse;
        else
            return '';
    }
}
