import { Joueur } from './joueur';
import { Manche } from './manche';

export class Rencontre {
    constructor() {
    }
    
    joueurEquipeReceveuse = new Joueur();
    joueurEquipeVisiteuse = new Joueur();
    manches = new Array(5).fill(new Manche());
}
