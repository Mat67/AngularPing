import { Equipe } from './equipe';
import { Rencontre } from './rencontre';
import { FormuleService } from '../services/formule.service';

export class Match {
    constructor (tailleEquipe: number) {
        this.equipeReceveuse = new Equipe(tailleEquipe, 'A');
        this.equipeVisiteuse = new Equipe(tailleEquipe, 'U');
        this.rencontres = new Array();
        
        var formule = new FormuleService().getFormule();
        
        formule.forEach(element => {
            var joueurEquipeReceveuse = this.equipeReceveuse.getJoueurByPoisition(element[0]);
            var joueurEquipeVisiteuse = this.equipeVisiteuse.getJoueurByPoisition(element[0]);
            this.rencontres.push(new Rencontre(joueurEquipeReceveuse, joueurEquipeVisiteuse));
        });
    }

    equipeReceveuse: Equipe
    equipeVisiteuse: Equipe
    rencontres: Rencontre[]
}
