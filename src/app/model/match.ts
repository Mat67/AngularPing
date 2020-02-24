import { Equipe } from './equipe';
import { Rencontre } from './rencontre';
import { FormuleService } from '../services/formule.service';
import { RencontreSimple } from './rencontre-simple';
import { RencontreDouble } from './rencontre-double';

export class Match {
    constructor (tailleEquipe: number) {
        this.equipeReceveuse = new Equipe(tailleEquipe, 'A');
        this.equipeVisiteuse = new Equipe(tailleEquipe, 'U');
        this.rencontres = new Array();
        
        var formule = new FormuleService().getFormule();
        
        formule.forEach(element => {
            var joueurEquipeReceveuse = this.equipeReceveuse.getJoueurByPosition(element[0]);
            var joueurEquipeVisiteuse = this.equipeVisiteuse.getJoueurByPosition(element[1]);
            
            var rencontre:Rencontre;
            if (joueurEquipeReceveuse) {
                rencontre = new RencontreSimple(joueurEquipeReceveuse, joueurEquipeVisiteuse);
            }
            else {
                rencontre = new RencontreDouble(element[0]);
            }   

            this.rencontres.push(rencontre);
        });
    }

    equipeReceveuse: Equipe
    equipeVisiteuse: Equipe

    rencontres: Rencontre[]

    public getSaison(): string {
        var aujourdhui = new Date();
        if (aujourdhui > new Date(aujourdhui.getFullYear(),7, 31))
            return aujourdhui.getFullYear() + '/' + aujourdhui.getFullYear() + 1;
        else
            return aujourdhui.getFullYear() - 1 + '/' + aujourdhui.getFullYear();
    }

    public scoreEquipeReceveuse(): number {
        return this.rencontres.filter(function (r) { return r.getResultat() > 0 }).length;
    }

    public scoreEquipeVisiteuse(): number {
        return this.rencontres.filter(function (r) { return r.getResultat() < 0 }).length;
    }

    public matchEstTermine(): boolean {
        return this.rencontres.filter(function (r) { return r.getResultat() !== 0; }).length === this.rencontres.length;
    }
}
