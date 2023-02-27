import { Joueur } from './joueur';

export class Equipe {


    constructor() {
      this.nomEquipe = ''
      this.joueurs = []
    }

    static fabriqueNouvelleEquipe(nombreJoueurs: number, equipeAX:string): any {
      var equipe = new Equipe()

      equipe.joueurs = new Array();

      for (let index = 0; index < nombreJoueurs; index++) {
        equipe.joueurs.push(new Joueur(equipe.getLettreAlphabet(equipeAX, index)));
      }

      return equipe
    }

    static fabrique(nomEquipe: any, joueurs: any): any {
      var equipe = new Equipe()
      equipe.joueurs = []

      equipe.nomEquipe = nomEquipe
      joueurs.forEach(j => {
        equipe.joueurs.push(Joueur.fabrique(j))
      })

      return equipe
    }

    joueurs: Joueur[];
    nomEquipe:string;

    public getJoueurByPosition(position:string) : Joueur {
        return this.joueurs.find(function (j) {
            return j.position === position;
        });
    }

    private getLettreAlphabet(lettre:string, position:number) {
        return String.fromCharCode(lettre.charCodeAt(0) + position);
    }
}
