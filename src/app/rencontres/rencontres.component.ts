import { Component, OnInit, Input, Output, EventEmitter, ElementRef, HostListener, ViewChild, QueryList, ViewChildren  } from '@angular/core';
import { Rencontre, RencontreDouble } from '../model/rencontre';
import { Match, Match6 } from '../model/match';
import { Equipe } from '../model/equipe';

@Component({
  selector: 'app-rencontres',
  templateUrl: './rencontres.component.html',
  styleUrls: ['./rencontres.component.css']
})
export class RencontresComponent implements OnInit {

  dropdownEquipeVisiteuseOpen: boolean[] = []
  dropdownEquipeReceveuseOpen: boolean[] = []
  
  @Input() rencontres: Rencontre[]
  @Input() equipeReceveuse: Equipe

  @Input() match: Match;
  @Input() lectureSeule: boolean
  @Input() cacherCompositionEquipeReceveuse: boolean
  @Input() cacherCompositionEquipeVisiteuse: boolean

  @Output() BlurMethod: EventEmitter<any> = new EventEmitter();


    // Utilisez ViewChild pour référencer la dropdown via son template
    @ViewChildren('dropdownMenusReceveur') dropdownMenusReceveur: QueryList<ElementRef>;
    @ViewChildren('dropdownMenusVisiteur') dropdownMenusVisiteur: QueryList<ElementRef>;
    
  constructor(private eRef: ElementRef) {
    this.dropdownEquipeVisiteuseOpen[0] = false
    this.dropdownEquipeVisiteuseOpen[1] = false

    this.dropdownEquipeReceveuseOpen[0] = false
    this.dropdownEquipeReceveuseOpen[1] = false
  }


  ngOnInit(): void {

  }

  onBlurMethod() {
    this.BlurMethod.emit()
  }

  // Fermer le dropdown si un clic est détecté à l'extérieur
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    // Si le clic est à l'extérieur de la dropdown (ni sur le bouton, ni sur la dropdown elle-même)
    this.dropdownMenusReceveur.forEach((dropdown, index) => {
      if (dropdown && !dropdown.nativeElement.contains(event.target)) {
        if (index == 0) {
          this.dropdownEquipeVisiteuseOpen[0] = false; // Fermer la dropdown si clic extérieur
          this.dropdownEquipeVisiteuseOpen[1] = false; // Fermer la dropdown si clic extérieur
          this.dropdownEquipeReceveuseOpen[1] = false; // Fermer la dropdown si clic extérieur
        }

        if (index == 1) {
          this.dropdownEquipeVisiteuseOpen[0] = false; // Fermer la dropdown si clic extérieur
          this.dropdownEquipeVisiteuseOpen[1] = false; // Fermer la dropdown si clic extérieur
          this.dropdownEquipeReceveuseOpen[0] = false; // Fermer la dropdown si clic extérieur
        }
      }
    });

    this.dropdownMenusVisiteur.forEach((dropdown, index) => {
      if (dropdown && !dropdown.nativeElement.contains(event.target)) {
        if (index == 0) {
          this.dropdownEquipeReceveuseOpen[0] = false; // Fermer la dropdown si clic extérieur
          this.dropdownEquipeReceveuseOpen[1] = false; // Fermer la dropdown si clic extérieur
          this.dropdownEquipeVisiteuseOpen[1] = false; // Fermer la dropdown si clic extérieur
        }

        if (index == 1) {
          this.dropdownEquipeReceveuseOpen[0] = false; // Fermer la dropdown si clic extérieur
          this.dropdownEquipeReceveuseOpen[1] = false; // Fermer la dropdown si clic extérieur
          this.dropdownEquipeVisiteuseOpen[0] = false; // Fermer la dropdown si clic extérieur
        }
      }
    });
  }

  getBackgroundColor(rencontre: any): string {
    if (this.match.getRencontresSuivantes().filter(r => r?.getFormule() === rencontre?.getFormule()).length > 0) {
      return '#CCE5FF'; // Changez la couleur selon vos besoins
    } else {
      return ''; // Laissez une chaîne vide pour la couleur par défaut
    }
  }

  toggleDropdownEquipeReceveuse(event: Event, index) {
    event.stopPropagation(); // Empêche la propagation de l'événement au document
    this.dropdownEquipeReceveuseOpen[index] = !this.dropdownEquipeReceveuseOpen[index];
    this.dropdownEquipeVisiteuseOpen[0] = false; // Fermer la dropdown si clic extérieur
    this.dropdownEquipeVisiteuseOpen[1] = false; // Fermer la dropdown si clic extérieur
    this.dropdownEquipeReceveuseOpen[index == 0 ? 1 : 0] = false; // Fermer la dropdown si clic extérieur
  }

  toggleDropdownEquipeVisiteuse(event: Event, index) {
    event.stopPropagation(); 
    this.dropdownEquipeVisiteuseOpen[index] = !this.dropdownEquipeVisiteuseOpen[index];
    this.dropdownEquipeReceveuseOpen[0] = false; // Fermer la dropdown si clic extérieur
    this.dropdownEquipeReceveuseOpen[1] = false; // Fermer la dropdown si clic extérieur
    this.dropdownEquipeVisiteuseOpen[index == 0 ? 1 : 0] = false; // Fermer la dropdown si clic extérieur
    
  }

  // Méthode pour sélectionner une option
  selectOptionEquipeReceveuse(value: string, rencontre : RencontreDouble, index: number) {
    rencontre.doubleEquipeReceveuse = value;  // Sauvegarde de la valeur
    this.dropdownEquipeReceveuseOpen[index] = false
  }

  selectOptionEquipeVisiteuse(value: string, rencontre : RencontreDouble, index: number) {
    rencontre.doubleEquipeVisiteuse = value;  // Sauvegarde de la valeur
    this.dropdownEquipeVisiteuseOpen[index] = false
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
