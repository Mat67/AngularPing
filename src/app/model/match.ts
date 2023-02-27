import { Equipe } from "./equipe";
import { Rencontre } from "./rencontre";
import { FormuleService } from "../services/formule.service";
import { RencontreSimple } from "./rencontre-simple";
import { RencontreDouble } from "./rencontre-double";
import { Timestamp } from "rxjs";
import { Time } from "@angular/common";

export abstract class Match {
  constructor(tailleEquipe:number) {
    this.id = new Date().getTime();
    this.equipeReceveuse = new Equipe(tailleEquipe, "A");
    this.equipeVisiteuse = new Equipe(tailleEquipe, "U");
    this.rencontres = new Array();

    var formule = new FormuleService().getFormule();

    formule.forEach((element) => {
      var joueurEquipeReceveuse = this.equipeReceveuse.getJoueurByPosition(
        element[0]
      );
      var joueurEquipeVisiteuse = this.equipeVisiteuse.getJoueurByPosition(
        element[1]
      );

      var rencontre: Rencontre;
      if (joueurEquipeReceveuse) {
        rencontre = new RencontreSimple(
          joueurEquipeReceveuse,
          joueurEquipeVisiteuse
        );
      } else {
        rencontre = new RencontreDouble(element[0]);
      }

      this.rencontres.push(rencontre);
    })
  }

  equipeReceveuse: Equipe;
  equipeVisiteuse: Equipe;
  id: any;
  journee: number = 1;
  saison: string;
  Date: Date;
  Heure: Time;
  categorie: string = "Messieurs";
  epreuve: string = "Championnat par équipe";
  division: string = "Excellence";
  poule: string = "A";
  lieu: string;
  signatureEquipeReceveuse = undefined;
  signatureEquipeVisiteuse = undefined;

  rencontres: Rencontre[];




  public static fabriqueMatch(obj) : Match {
    var match: Match

    var switchValue

    if (isNaN(obj)) {
      switchValue = obj?.equipeReceveuse?.joueurs?.length
    } else {
      switchValue = obj
    }

    switch (switchValue) {
      case 6:
        match = new Match6()
        break
      case 4:
        match = new Match4()
        break
      case 4:
        match = new Match3()
        break

      default:
        break;
    }

    if (isNaN(obj)) {
      match.chargerMath(obj)

    }

    return match
  }

  public getSaison(): string {
    var aujourdhui = new Date();
    if (aujourdhui > new Date(aujourdhui.getFullYear(), 7, 31))
      return aujourdhui.getFullYear() + "/" + aujourdhui.getFullYear() + 1;
    else return aujourdhui.getFullYear() - 1 + "/" + aujourdhui.getFullYear();
  }

  public scoreEquipeReceveuse(): number {
    return this.rencontres.filter(function (r) {
      return r.getResultat() > 0;
    }).length;
  }

  public scoreEquipeVisiteuse(): number {
    return this.rencontres.filter(function (r) {
      return r.getResultat() < 0;
    }).length;
  }

  public getPointEquipeReceveuse(): number {
    return this.getPointFromScore(this.scoreEquipeReceveuse());
  }

  public getPointEquipeVisiteuse(): number {
    return this.getPointFromScore(this.scoreEquipeVisiteuse());
  }

  public getPointFromScore(score): number {
    if (score >= 16) {
      return 5;
    } else if (score <= 4) {
      return 1;
    } else if (score == 10) {
      return 3;
    } else if (score > 10 && score < 16) {
      return 4;
    } else if (score > 4 && score < 10) {
      return 2;
    }
  }

  public matchEstTermine(): boolean {
    return (
      this.rencontres.filter(function (r) {
        return r.getResultat() !== 0;
      }).length === this.rencontres.length
    );
  }

  public getStatus() {
    return "ENCOURS";
  }

  public chargerMath(match:Match) {
    for (const key in match) {
      if (Object.prototype.hasOwnProperty.call(match, key)) {
        this[key] = match[key]
      }
    }
  }

  public toString() {
    return `${this.equipeReceveuse.nomEquipe} vs ${
      this.equipeVisiteuse.nomEquipe
    } : ${this.scoreEquipeReceveuse()} vs ${this.scoreEquipeVisiteuse()}`;
  }
}


export class Match6 extends Match {
  constructor() {
    super(6)
  }
}

export class Match4 extends Match {
  constructor() {
    super(4)
  }
}


export class Match3 extends Match {
  constructor() {
    super(3)
  }
}
