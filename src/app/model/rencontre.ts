import { Joueur } from './joueur';
import { Manche } from './manche';

export class Rencontre {
    constructor(joueurEquipeReceveuse:Joueur, joueurEquipeVisiteuse:Joueur) {
        this.joueurEquipeReceveuse = joueurEquipeReceveuse;
        this.joueurEquipeVisiteuse = joueurEquipeVisiteuse;
    }
    
    joueurEquipeReceveuse:Joueur;
    joueurEquipeVisiteuse:Joueur;
    
    manches = new Array(5).fill(new Manche());
}
