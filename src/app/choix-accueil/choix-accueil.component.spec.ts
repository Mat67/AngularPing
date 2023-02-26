import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixAccueilComponent } from './choix-accueil.component';

describe('ChoixAccueilComponent', () => {
  let component: ChoixAccueilComponent;
  let fixture: ComponentFixture<ChoixAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoixAccueilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoixAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
