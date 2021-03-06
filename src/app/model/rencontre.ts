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

    public getResultat() : number {
        var nbManchesAGagner = Math.trunc(this.manches.length / 2) + 1;
        var score = 0;
        var maxManchesGagnees = 0;
        this.manches.forEach(manche => {
            if (manche.getResultat() < 0) {
                score--;
            }
            else if (manche.getResultat() > 0) {
                score++;
            }
        });

        maxManchesGagnees = this.manches.filter(function (m) { return m.getResultat() < 0 }).length;
        var tmp = this.manches.filter(function (m) { return m.getResultat() > 0 }).length;

        if (tmp > maxManchesGagnees)
            maxManchesGagnees = tmp;
        
        if (maxManchesGagnees < nbManchesAGagner)
            return 0;

        return score;
    }

    public getVainqueur():string {
        var score = this.getResultat();

        if (score > 0)
            return this.getPositionJoueurEquipeReceveuse();
        else if (score < 0)
            return this.getPositionJoueurEquipeVisiteuse();
        else
            return '';
    }

    
    getPositionJoueurEquipeReceveuse():string {
        // override par RencontreSimple et RencontreDouble
        return '';
    }

    getPositionJoueurEquipeVisiteuse():string {
        // override par RencontreSimple et RencontreDouble
        return '';
    }

    getNomJoueurEquipeReceveuse():string {
        // override par RencontreSimple et RencontreDouble
        return '';
    }

    getNomJoueurEquipeVisiteuse():string {
        // override par RencontreSimple et RencontreDouble
        return '';
    }

    getTypeRencontre():string {
        return '';
    }
}
