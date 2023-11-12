import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RencontreRowComponent } from './rencontre-row.component';

describe('RencontreRowComponent', () => {
  let component: RencontreRowComponent;
  let fixture: ComponentFixture<RencontreRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RencontreRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RencontreRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
