import { Joueur } from './joueur';
import { Manche } from './manche';
import { RencontreSimple } from './rencontre-simple';
import { RencontreDouble } from './rencontre-double';

export class Rencontre {
    constructor() {
        this.manches = new Array();

        for (let index = 0; index < 5; index++) {
            this.manches.push(new Manche());
        }
    }
    
    manches: Manche[] = new Array

    public getFormule() : string{
        return '';
    }

    public getVainqueur():string {
        var nbManchesAGagner = Math.trunc(this.manches.length / 2) + 1;
        var score = 0;
        var maxManchesGagnees = 0;

        this.manches.forEach(manche => {
            if (manche.getResultat() < 0) {
                score--;
                maxManchesGagnees++;
            }
            else if (manche.getResultat() > 0) {
                score++;
                maxManchesGagnees++;
            }
        });

        maxManchesGagnees = this.manches.filter(function (m) { return m.getResultat() < 0 }).length;
        var tmp = this.manches.filter(function (m) { return m.getResultat() > 0 }).length;

        if (tmp > maxManchesGagnees)
            maxManchesGagnees = tmp;
        

        if (maxManchesGagnees < nbManchesAGagner)
            return '';

        if (score > 0)
            return this.getNomJoueurEquipeReceveuse();
        else if (score < 0)
            return this.getNomJoueurEquipeVisiteuse();
        else
            return '';
    }

    getNomJoueurEquipeReceveuse():string {
        return '';
    }

    getNomJoueurEquipeVisiteuse():string {
        return '';
    }
}
