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

    getPositionJoueurEquipeReceveuse():string {
        return this.doubleEquipeReceveuse;
    }

    getPositionJoueurEquipeVisiteuse():string {
        // override par RencontreSimple et RencontreDouble
        return this.doubleEquipeVisiteuse;
    }

    getTypeRencontre():string {
        return 'RencontreDouble';
    }
}
