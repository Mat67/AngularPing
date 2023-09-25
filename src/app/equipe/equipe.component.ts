import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Equipe } from '../model/equipe';
import { Observable, OperatorFunction, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Joueur } from '../model/joueur';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {

  @Input() equipe: Equipe;
  @Input() joueurs: Joueur[];
  @Input() equipes: string[];
  @Input() lectureSeule: boolean
  @Output() BlurMethod: EventEmitter<any> = new EventEmitter();

  constructor() { }


  onItemSelected(event: NgbTypeaheadSelectItemEvent<string>, i: string): void {
    var joueurSelectionne = this.joueurs.find(j => j.nom.toLocaleLowerCase() === event.item.toLocaleLowerCase())

    if (joueurSelectionne) {
      this.equipe.joueurs[i].nom = joueurSelectionne?.nom
      this.equipe.joueurs[i].classement = joueurSelectionne?.classement
      this.equipe.joueurs[i].numeroLicence = joueurSelectionne?.numeroLicence
    }
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : this.joueurs.filter((v) => v?.nom?.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10).map(m => m.nom),
      ),
    );


  searchEquipe: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : this.equipes.filter((v) => v?.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
      ),
    );


  onEquipeSelected(event: NgbTypeaheadSelectItemEvent<string>): void {
    this.equipe.nomEquipe = event.item
  }

  ngOnInit(): void {

  }

  onBlurMethod() {
    this.BlurMethod.emit()
  }

  setCaptain(joueurChoisit): void {
    if (this.lectureSeule !== true) {
      this.equipe.joueurs.forEach(joueur => {
        if (joueur.position == joueurChoisit.position) {
          joueur.estCapitaine = !joueur.estCapitaine;
        }
        else {
          joueur.estCapitaine = false;
        }
      });

      this.onBlurMethod()
    }
  }
}
