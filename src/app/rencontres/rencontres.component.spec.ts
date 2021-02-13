import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RencontresComponent } from './rencontres.component';
import { Rencontre } from '../model/rencontre';
import { Joueur } from '../model/joueur';
import { Match } from '../model/match';
import { RencontreSimple } from '../model/rencontre-simple';

describe('RencontresComponent', () => {
  let component: RencontresComponent;
  let fixture: ComponentFixture<RencontresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RencontresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RencontresComponent);
    component = fixture.componentInstance;
    var rencontres = [];
    rencontres.push(new RencontreSimple(new Joueur('A'), new Joueur('U')));
    component.match = new Match(6);
    component.rencontres = component.match.rencontres;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('la formule de la rencontre est A-U', () => {
    expect(component.rencontres[0].getFormule()).toBe('A-U');
  });
});
