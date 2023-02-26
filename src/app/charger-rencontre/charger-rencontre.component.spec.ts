import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargerRencontreComponent } from './charger-rencontre.component';

describe('ChargerRencontreComponent', () => {
  let component: ChargerRencontreComponent;
  let fixture: ComponentFixture<ChargerRencontreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargerRencontreComponent ]
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
