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
  @Output() BlurMethod: EventEmitter<any> = new EventEmitter();

  constructor() { }


  onItemSelected(event: NgbTypeaheadSelectItemEvent<Joueur>, i:string): void {
    this.equipe.joueurs[i].nom = event.item?.nom
    this.equipe.joueurs[i].classement = event.item?.classement
    this.equipe.joueurs[i].numeroLicence = event.item?.numeroLicence
  }

  search: OperatorFunction<string, readonly Joueur[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map((term) =>
      term.length < 2 ? [] : this.joueurs.filter((v) => v?.nom?.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
    ),
  );


  ngOnInit(): void {

  }

  onBlurMethod() {
    this.BlurMethod.emit()
  }

  setCaptain(joueurChoisit): void{
    this.equipe.joueurs.forEach(joueur => {
      if(joueur.position == joueurChoisit.position)
      {
        joueur.estCapitaine = !joueur.estCapitaine;
      }
      else
      {
        joueur.estCapitaine = false;
      }
    });

    this.onBlurMethod()
  }
}
