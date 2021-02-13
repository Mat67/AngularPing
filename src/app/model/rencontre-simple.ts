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
        return this.getPositionJoueurEquipeReceveuse() + '-' + this.getPositionJoueurEquipeVisiteuse();
    }

    getPositionJoueurEquipeReceveuse():string {
        return this.joueurEquipeReceveuse.position;
    }

    getNomJoueurEquipeReceveuse():string {
        return this.joueurEquipeReceveuse.nom;
    }

    getPositionJoueurEquipeVisiteuse():string {
        return this.joueurEquipeVisiteuse.position;
    }

    getNomJoueurEquipeVisiteuse():string {
        return this.joueurEquipeVisiteuse.nom;
    }

    getTypeRencontre():string {
        return 'RencontreSimple';
    }
}
