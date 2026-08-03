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
    if (this.dropdownMenusReceveur) {
      this.dropdownMenusReceveur.forEach((dropdown, index) => {
        if (dropdown && !dropdown.nativeElement.contains(event.target)) {
          this.dropdownEquipeReceveuseOpen[index] = false;
        }
      });
    }

    if (this.dropdownMenusVisiteur) {
      this.dropdownMenusVisiteur.forEach((dropdown, index) => {
        if (dropdown && !dropdown.nativeElement.contains(event.target)) {
          this.dropdownEquipeVisiteuseOpen[index] = false;
        }
      });
    }
  }

  getBackgroundColor(rencontre: any): string {
    if (this.match && this.match.getRencontresSuivantes().filter(r => r?.getFormule() === rencontre?.getFormule()).length > 0) {
      return '#CCE5FF';
    } else {
      return '';
    }
  }

  toggleDropdownEquipeReceveuse(event: Event, index) {
    event.stopPropagation();
    this.dropdownEquipeReceveuseOpen[index] = !this.dropdownEquipeReceveuseOpen[index];
    this.dropdownEquipeVisiteuseOpen[0] = false;
    this.dropdownEquipeVisiteuseOpen[1] = false;
    this.dropdownEquipeReceveuseOpen[index == 0 ? 1 : 0] = false;
  }

  toggleDropdownEquipeVisiteuse(event: Event, index) {
    event.stopPropagation(); 
    this.dropdownEquipeVisiteuseOpen[index] = !this.dropdownEquipeVisiteuseOpen[index];
    this.dropdownEquipeReceveuseOpen[0] = false;
    this.dropdownEquipeReceveuseOpen[1] = false;
    this.dropdownEquipeVisiteuseOpen[index == 0 ? 1 : 0] = false;
  }

  // Méthode pour sélectionner une option
  selectOptionEquipeReceveuse(value: string, rencontre : RencontreDouble, index: number) {
    rencontre.doubleEquipeReceveuse = value;
    this.dropdownEquipeReceveuseOpen[index] = false;
  }

  selectOptionEquipeVisiteuse(value: string, rencontre : RencontreDouble, index: number) {
    rencontre.doubleEquipeVisiteuse = value;
    this.dropdownEquipeVisiteuseOpen[index] = false;
  }

  omit_number(score: string, evt: KeyboardEvent): boolean {
    const val = score || '';
    const charValid = (evt.key === '-' || (!isNaN(Number(evt.key)) && evt.key !== ' '));
    if (!charValid) {
      if (evt && evt.preventDefault) evt.preventDefault();
      return false;
    }

    const separateur = val.indexOf('-');
    if (evt.key === '-' && separateur !== -1) {
      if (evt && evt.preventDefault) evt.preventDefault();
      return false;
    }
    if (evt.key === '-' && separateur === -1 && val.split('-')[0].length === 0) {
      if (evt && evt.preventDefault) evt.preventDefault();
      return false;
    }
    if (!isNaN(Number(evt.key)) && evt.key !== ' ') {
      const parts = val.split('-');
      const partieGaucheValide = parts[0].length < 2 || separateur !== -1;
      const partieDroiteValide = separateur === -1 || (parts[1] && parts[1].length < 2);
      if (!(partieGaucheValide && partieDroiteValide)) {
        if (evt && evt.preventDefault) evt.preventDefault();
        return false;
      }
    }

    return true;
  }

  
}
