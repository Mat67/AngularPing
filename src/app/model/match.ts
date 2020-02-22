import { Equipe } from './equipe';
import { Rencontre } from './rencontre';

export class Match {
    constructor (tailleEquipe: number) {
        this.equipeReceveuse = new Equipe(tailleEquipe);
        this.equipeVisiteuse = new Equipe(tailleEquipe);
        this.rencontres = new Array(20).fill(new Rencontre());
    }
    
    equipeReceveuse: Equipe
    equipeVisiteuse: Equipe
    rencontres: Rencontre[]
}
