import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChargerRencontreComponent } from './charger-rencontre.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChargerRencontreComponent', () => {
  let component: ChargerRencontreComponent;
  let fixture: ComponentFixture<ChargerRencontreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargerRencontreComponent ],
      imports: [ RouterTestingModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargerRencontreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
