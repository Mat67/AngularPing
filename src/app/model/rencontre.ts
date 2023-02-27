import { Joueur } from './joueur';
import { Manche } from './manche';

export class Rencontre {
    constructor() {
        this.manches = new Array();

        for (let index = 0; index < 5; index++) {
            this.manches.push(new Manche());
        }
    }

    manches: Manche[] = new Array

    public getFormule() : string{
        return '';
    }


    static fabriqueRencontre(data) {
      var rencontre

      if (data.joueurEquipeReceveuse && data.joueurEquipeVisiteuse)
        rencontre = new RencontreSimple(data.joueurEquipeReceveuse, data.joueurEquipeVisiteuse)
      else
        rencontre = new RencontreDouble(data.formule)

      data.manches.forEach(m => {
        rencontre.manches.push(Manche.fabrique(m.score))
      })

      return rencontre
    }


    public getResultat() : number {
        var nbManchesAGagner = Math.trunc(this.manches.length / 2) + 1;
        var score = 0;
        var maxManchesGagnees = 0;
        this.manches.forEach(manche => {
            if (manche.getResultat() < 0) {
                score--;
            }
            else if (manche.getResultat() > 0) {
                score++;
            }
        });

        maxManchesGagnees = this.manches.filter(function (m) { return m.getResultat() < 0 }).length;
        var tmp = this.manches.filter(function (m) { return m.getResultat() > 0 }).length;

        if (tmp > maxManchesGagnees)
            maxManchesGagnees = tmp;

        if (maxManchesGagnees < nbManchesAGagner)
            return 0;

        return score;
    }

    public getVainqueur():string {
        var score = this.getResultat();

        if (score > 0)
            return this.getPositionJoueurEquipeReceveuse();
        else if (score < 0)
            return this.getPositionJoueurEquipeVisiteuse();
        else
            return '';
    }


    getPositionJoueurEquipeReceveuse():string {
        // override par RencontreSimple et RencontreDouble
        return '';
    }

    getPositionJoueurEquipeVisiteuse():string {
        // override par RencontreSimple et RencontreDouble
        return '';
    }

    getNomJoueurEquipeReceveuse():string {
        // override par RencontreSimple et RencontreDouble
        return '';
    }

    getNomJoueurEquipeVisiteuse():string {
        // override par RencontreSimple et RencontreDouble
        return '';
    }

    getTypeRencontre():string {
        return '';
    }
}


export class RencontreDouble extends Rencontre{
  constructor(formule:string) {
      super();
      this.formule = formule;
  }

  private formule:string;
  doubleEquipeReceveuse:string;
  doubleEquipeVisiteuse:string;

  getFormule():string {
      return this.formule;
  }

  getNomJoueurEquipeReceveuse():string {
      return this.doubleEquipeReceveuse;
  }

  getNomJoueurEquipeVisiteuse():string {
      return this.doubleEquipeVisiteuse;
  }

  getPositionJoueurEquipeReceveuse():string {
      return this.doubleEquipeReceveuse;
  }

  getPositionJoueurEquipeVisiteuse():string {
      // override par RencontreSimple et RencontreDouble
      return this.doubleEquipeVisiteuse;
  }

  getTypeRencontre():string {
      return 'RencontreDouble';
  }
}


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
