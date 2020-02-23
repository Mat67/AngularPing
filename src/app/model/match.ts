import { Equipe } from './equipe';
import { Rencontre } from './rencontre';
import { FormuleService } from '../services/formule.service';
import { RencontreSimple } from './rencontre-simple';
import { RencontreDouble } from './rencontre-double';

export class Match {
    constructor (tailleEquipe: number) {
        this.equipeReceveuse = new Equipe(tailleEquipe, 'A');
        this.equipeVisiteuse = new Equipe(tailleEquipe, 'U');
        this.rencontres = new Array();
        
        var formule = new FormuleService().getFormule();
        
        formule.forEach(element => {
            var joueurEquipeReceveuse = this.equipeReceveuse.getJoueurByPosition(element[0]);
            var joueurEquipeVisiteuse = this.equipeVisiteuse.getJoueurByPosition(element[1]);
            
            var rencontre:Rencontre;
            var formule = element[0] + '-' [1];
            if (joueurEquipeReceveuse) {
                rencontre = new RencontreSimple(joueurEquipeReceveuse, joueurEquipeVisiteuse);
            }
            else {
                rencontre = new RencontreDouble(formule);
            }   

            this.rencontres.push(rencontre);
        });
    }

    equipeReceveuse: Equipe
    equipeVisiteuse: Equipe
    rencontres: Rencontre[]
}
