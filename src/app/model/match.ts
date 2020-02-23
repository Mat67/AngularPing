import { Equipe } from './equipe';
import { Rencontre } from './rencontre';

export class Match {
    constructor (tailleEquipe: number) {
        this.equipeReceveuse = new Equipe(tailleEquipe, 'A');
        this.equipeVisiteuse = new Equipe(tailleEquipe, 'U');
        this.rencontres = new Array();
        
        for (let index = 0; index < 20; index++) {
            this.rencontres.push(new Rencontre(this.equipeReceveuse.joueurs[0], this.equipeVisiteuse.joueurs[0]));
        }
    }

    equipeReceveuse: Equipe
    equipeVisiteuse: Equipe
    rencontres: Rencontre[]
}
