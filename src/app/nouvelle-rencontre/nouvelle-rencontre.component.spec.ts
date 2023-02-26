import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleRencontreComponent } from './nouvelle-rencontre.component';

describe('NouvelleRencontreComponent', () => {
  let component: NouvelleRencontreComponent;
  let fixture: ComponentFixture<NouvelleRencontreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouvelleRencontreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouvelleRencontreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
