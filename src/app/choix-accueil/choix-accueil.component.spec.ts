import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChoixAccueilComponent } from './choix-accueil.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChoixAccueilComponent', () => {
  let component: ChoixAccueilComponent;
  let fixture: ComponentFixture<ChoixAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoixAccueilComponent ],
      imports: [ RouterTestingModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
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
