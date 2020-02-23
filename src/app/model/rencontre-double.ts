import { Rencontre } from './rencontre';

export class RencontreDouble extends Rencontre{
    constructor(formule:string) {
        super();
        this.formule = formule;
    }

    private formule:string;
    doubleEquipeReceveuse:string;
    doubleEquipeVisiteuse:string;

    getFormule():string {
        return this.formule;
    }

    getNomJoueurEquipeReceveuse():string {
        return this.doubleEquipeReceveuse;
    }

    getNomJoueurEquipeVisiteuse():string {
        return this.doubleEquipeVisiteuse;
    }
}
