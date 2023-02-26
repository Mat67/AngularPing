import { Equipe } from './equipe';
import { Rencontre } from './rencontre';
import { FormuleService } from '../services/formule.service';
import { RencontreSimple } from './rencontre-simple';
import { RencontreDouble } from './rencontre-double';
import { Timestamp } from 'rxjs';
import { Time } from '@angular/common';

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

    equipeReceveuse: Equipe;
    equipeVisiteuse: Equipe;
    journee:number=1;
    saison:string;
    Date:Date;
    Heure:Time;
    categorie:string = 'Messieurs';
    epreuve:string = 'Championnat par équipe';
    division:string = 'Excellence';
    poule:string='A';
    lieu:string;
    signatureEquipeReceveuse = undefined;
    signatureEquipeVisiteuse = undefined;

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

    public getPointEquipeReceveuse(): number {
        return this.getPointFromScore(this.scoreEquipeReceveuse());
    }

    public getPointEquipeVisiteuse(): number {
        return this.getPointFromScore(this.scoreEquipeVisiteuse());
    }

    public getPointFromScore(score) : number
    {
        if(score >= 16 )
        {
            return 5;
        }
        else if(score <= 4)
        {
            return 1;
        }
        else if(score == 10)
        {
            return 3;
        }
        else if(score > 10 && score < 16)
        {
            return 4;
        }
        else if(score > 4 && score < 10)
        {
            return 2;
        }
    }

    public matchEstTermine(): boolean {
        return this.rencontres.filter(function (r) { return r.getResultat() !== 0; }).length === this.rencontres.length;
    }
}
