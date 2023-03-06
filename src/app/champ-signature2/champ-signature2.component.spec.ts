import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampSignature2Component } from './champ-signature2.component';

describe('ChampSignature2Component', () => {
  let component: ChampSignature2Component;
  let fixture: ComponentFixture<ChampSignature2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampSignature2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampSignature2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
