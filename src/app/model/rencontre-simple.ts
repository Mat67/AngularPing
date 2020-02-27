import { Rencontre } from './rencontre';
import { Joueur } from './joueur';

export class RencontreSimple extends Rencontre{
    constructor(joueurEquipeReceveuse:Joueur, joueurEquipeVisiteuse:Joueur) {
        super();
        this.joueurEquipeReceveuse = joueurEquipeReceveuse;
        this.joueurEquipeVisiteuse = joueurEquipeVisiteuse;
    }

    joueurEquipeReceveuse:Joueur;
    joueurEquipeVisiteuse:Joueur;

    getFormule():string {
        return this.getNomJoueurEquipeReceveuse() + '-' + this.getNomJoueurEquipeVisiteuse();
    }

    getNomJoueurEquipeReceveuse():string {
        return this.joueurEquipeReceveuse.position;
    }

    getNomJoueurEquipeVisiteuse():string {
        return this.joueurEquipeVisiteuse.position;
    }

    getTypeRencontre():string {
        return 'RencontreSimple';
    }
}
