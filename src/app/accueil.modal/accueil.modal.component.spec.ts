import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accueil.ModalComponent } from './accueil.modal.component';

describe('Accueil.ModalComponent', () => {
  let component: Accueil.ModalComponent;
  let fixture: ComponentFixture<Accueil.ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Accueil.ModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Accueil.ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
