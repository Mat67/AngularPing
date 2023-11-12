import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Rencontre } from '../model/rencontre';
import { Match, Match6 } from '../model/match';

@Component({
  selector: 'app-rencontres',
  templateUrl: './rencontres.component.html',
  styleUrls: ['./rencontres.component.css']
})
export class RencontresComponent implements OnInit {
  @Input() rencontres: Rencontre[]

  @Input() match: Match;
  @Input() lectureSeule: boolean
  @Output() BlurMethod: EventEmitter<any> = new EventEmitter();

  constructor() {
  }


  ngOnInit(): void {

  }

  onBlurMethod() {
    this.BlurMethod.emit()
  }


  getBackgroundColor(rencontre: any): string {
    if (this.match.getRencontresSuivantes().filter(r => r?.getFormule() === rencontre?.getFormule()).length > 0) {
      return '#CCE5FF'; // Changez la couleur selon vos besoins
    } else {
      return ''; // Laissez une chaîne vide pour la couleur par défaut
    }
  }

  omit_number(score, evt):boolean {
    var charValid =  (evt.key === '-' || !isNaN(evt.key))
    if (charValid) {
      var separateur = score.indexOf('-')


      if (evt.key === '-' && separateur !== -1)
        return false // Pas le droit d'avoir plus d'1 occurence de '-'
      else if (evt.key === '-' && separateur === -1 && score.split('-')[0].length === 0)
        return false // impossible de saisir '-' si on a pas au moins 1 nombre sur la partie de gauche
      else if (!isNaN(evt.key)) {
        var partieGaucheValide = score.split('-')[0].length < 2 || separateur !== -1
        var partieDroiteValide = separateur === -1 || score.split('-')[1].length < 2
        return partieGaucheValide && partieDroiteValide
      }
    }

    return charValid
  }
}
