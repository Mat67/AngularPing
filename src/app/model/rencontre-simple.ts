import { Rencontre } from './rencontre';
import { Joueur } from './joueur';

export class RencontreSimple extends Rencontre{
    constructor(joueurEquipeReceveuse:Joueur, joueurEquipeVisiteuse:Joueur) {
        super()
        this.joueurEquipeReceveuse = joueurEquipeReceveuse;
        this.joueurEquipeVisiteuse = joueurEquipeVisiteuse;
    }

    joueurEquipeReceveuse:Joueur;
    joueurEquipeVisiteuse:Joueur;
}
