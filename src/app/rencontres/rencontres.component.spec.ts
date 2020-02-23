import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RencontresComponent } from './rencontres.component';
import { Rencontre } from '../model/rencontre';
import { Joueur } from '../model/joueur';
import { Match } from '../model/match';

describe('RencontresComponent', () => {
  let component: RencontresComponent;
  let fixture: ComponentFixture<RencontresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RencontresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RencontresComponent);
    component = fixture.componentInstance;
    var rencontres = [];
    rencontres.push(new Rencontre(new Joueur(1, 'A'), new Joueur(2, 'U')));
    rencontres.push(new Rencontre(new Joueur(1, 'A'), new Joueur(2, 'U')));
    rencontres.push(new Rencontre(new Joueur(1, 'A'), new Joueur(2, 'U')));
    rencontres.push(new Rencontre(new Joueur(1, 'A'), new Joueur(2, 'U')));
    component.match = new Match(6);
    component.rencontres = component.match.rencontres;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
