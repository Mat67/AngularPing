import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeComponent } from './equipe.component';
import { Equipe } from '../model/equipe';

describe('EquipeComponent', () => {
  let component: EquipeComponent;
  let fixture: ComponentFixture<EquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipeComponent);
    component = fixture.componentInstance;
    component.equipe = new Equipe(6, 'A');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
