import { Equipe } from "./equipe";
import { Rencontre, RencontreDouble, RencontreSimple } from "./rencontre";
import { Timestamp } from "rxjs";
import { Time } from "@angular/common";

export abstract class Match {
  constructor(tailleEquipe: number) {
    this.id = new Date().getTime().toString()
    this.equipeReceveuse = Equipe.fabriqueNouvelleEquipe(tailleEquipe, "A");
    this.equipeVisiteuse = Equipe.fabriqueNouvelleEquipe(tailleEquipe, "U");
    this.rencontres = new Array();

    this.Date = new Date()

    var heure = 20
    if (this.Date.getDay() === 6) {
      heure = 15
    }

    this.Heure = {
      hour: heure,
      minute: 0,
      second: 0
    }
    

    this.getFormule().forEach((element) => {
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
  id: string;
  journee: number = 1;
  saison: string;
  Date: Date;
  Heure: any;
  categorie: string = "Messieurs";
  epreuve: string = "Championnat par équipe";
  division: string = "Excellence";
  poule: string = "A";
  lieu: string;
  signatureEquipeReceveuse = undefined;
  signatureEquipeVisiteuse = undefined;

  rencontres: Rencontre[];
  public getFormule() : string[][]
  {
    return []
  }

  public static fabriqueMatch(obj): Match {
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
      case 3:
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
      return aujourdhui.getFullYear() + "/" + (aujourdhui.getFullYear() + 1);
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
    return -1
  }

  public matchEstTermine(): boolean {
    return (
      this.rencontres.filter(function (r) {
        return r.getResultat() !== 0;
      }).length === this.rencontres.length
    );
  }

  public getStatus() {
    if (this.matchEstTermine())
      return "TERMINE"
    else if (this.matchEstBrouillon())
      return 'BROUILLON'
    return "ENCOURS";
  }
  public matchEstBrouillon() {
    return !this.equipeReceveuse.nomEquipe || this.equipeReceveuse.nomEquipe.trim() === ''
      || !this.equipeVisiteuse.nomEquipe || this.equipeVisiteuse.nomEquipe.trim() === ''
  }

  public getRencontresSuivantes(): Rencontre[] {
    return this.rencontres.filter(r => r.getResultat() === 0).slice(0,2)
  }

  public chargerMath(match) {
    for (const key in match) {
      if (Object.prototype.hasOwnProperty.call(match, key)) {

        if (['equipeReceveuse', 'equipeVisiteuse'].indexOf(key) !== -1)
          this[key] = Equipe.fabrique(match[key].nomEquipe, match[key].joueurs)
        // else if (key === 'Date')
        //   this[key] = new Date(match[key]?.year, match[key]?.month, match[key]?.Date?.Day)
        // else if (key === 'Heure')
        //   this[key]

        else if (key === 'rencontres') {
          this[key] = []
          match[key].forEach(r => {
            var data = {
              joueurEquipeReceveuse: this.equipeReceveuse.getJoueurByPosition(r?.joueurEquipeReceveuse?.position),
              joueurEquipeVisiteuse: this.equipeVisiteuse.getJoueurByPosition(r?.joueurEquipeVisiteuse?.position),
              doubleEquipeReceveuse: r?.doubleEquipeReceveuse,
              doubleEquipeVisiteuse: r?.doubleEquipeVisiteuse,
              formule: r?.formule,
              manches: r?.manches
            }

            var rencontre = Rencontre.fabriqueRencontre(data)
            this[key].push(rencontre)

            // if (r.joueurEquipeReceveuse && r.joueurEquipeVisiteuse)
            //   Rencontre.fabriqueDouble(r)
          })
        }
        else
          this[key] = match[key]
      }
    }
  }

  public toString() {
    return `${this.equipeReceveuse.nomEquipe} contre ${this.equipeVisiteuse.nomEquipe
      } : ${this.scoreEquipeReceveuse()} - ${this.scoreEquipeVisiteuse()}`;
  }
}


export class Match6 extends Match {
  constructor() {
    super(6)
  }

  public getRencontresSuivantes() {
    var rencontres = []
    
    rencontres.push(this.rencontres.slice(0, 10).find(r => r.getResultat() === 0))
    rencontres.push(this.rencontres.slice(-10).find(r => r.getResultat() === 0))

    return rencontres
  }


  public getFormule(): string[][]
  {
    return [['A', 'U'],
      ['B', 'V'],
      ['C', 'W'],
      ['B', 'U'],
      ['A', 'W'],
      ['C', 'V'],
      ['D1', 'D1'],
      ['B', 'W'],
      ['C', 'U'],
      ['A', 'V'],
      ['D', 'X'],
      ['E', 'Y'],
      ['F', 'Z'],
      ['D2', 'D2'],
      ['E', 'X'],
      ['D', 'Z'],
      ['F', 'Y'],
      ['E', 'Z'],
      ['F', 'X'],
      ['D', 'Y'],
    ];
  }

  public getPointFromScore(score: any): number {
    if (score <= 4) 
      return 1
    else if (score < 10)
      return 2
    else if (score === 10)
      return 3
    else if (score >= 16)
      return 5
    else 
      return 4
  }
}

export class Match4 extends Match {
  constructor() {
    super(4)
  }

  public getFormule(): string[][]
  {
    return [['A', 'U'],
      ['B', 'V'],
      ['C', 'W'],
      ['D', 'X'],
      ['A', 'V'],
      ['B', 'U'],
      ['D', 'W'],
      ['C', 'X'],
      ['D1', 'D1'],
      ['D2', 'D2'],
      ['D', 'U'],
      ['C', 'V'],
      ['A', 'X'],
      ['B', 'W'],
      ['C', 'U'],
      ['D', 'V'],
      ['A', 'W'],
      ['B', 'X'],
    ];
  }

  public getPointFromScore(score: any): number {
    if (score <= 4) 
      return 1
    else if (score < 9)
      return 2
    else if (score === 9)
      return 3
    else if (score >= 14)
      return 5
    else 
      return 4
  }
}


export class Match3 extends Match {
  constructor() {
    super(3)
  }


  public getFormule(): string[][]
  {
    return [['A', 'U'],
      ['B', 'V'],
      ['C', 'W'],
      ['B', 'U'],
      ['D1', 'D1'],
      ['A', 'W'],
      ['C', 'V'],
      ['B', 'W'],
      ['C', 'U'],
      ['A', 'V'],
    ];
  }

  public getPointFromScore(score: any): number {
    if (score <= 2) 
      return 1
    else if (score < 5)
      return 2
    else if (score === 5)
      return 3
    else if (score >= 8)
      return 5
    else 
      return 4
  }
}
