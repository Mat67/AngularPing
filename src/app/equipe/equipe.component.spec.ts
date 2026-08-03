import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EquipeComponent } from './equipe.component';
import { Equipe } from '../model/equipe';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EquipeComponent', () => {
  let component: EquipeComponent;
  let fixture: ComponentFixture<EquipeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipeComponent ],
      imports: [ FormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipeComponent);
    component = fixture.componentInstance;
    component.equipe = Equipe.fabriqueNouvelleEquipe(6, 'A');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
