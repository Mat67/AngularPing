import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RencontresComponent } from './rencontres.component';
import { RencontreSimple } from '../model/rencontre';
import { Joueur } from '../model/joueur';
import { Match6 } from '../model/match';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RencontresComponent', () => {
  let component: RencontresComponent;
  let fixture: ComponentFixture<RencontresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RencontresComponent ],
      imports: [ FormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RencontresComponent);
    component = fixture.componentInstance;
    var rencontres = [];
    rencontres.push(new RencontreSimple(new Joueur('A'), new Joueur('U')));
    component.match = new Match6();

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
