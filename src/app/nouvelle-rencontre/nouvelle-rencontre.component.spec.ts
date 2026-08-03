import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NouvelleRencontreComponent } from './nouvelle-rencontre.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RepositoryService } from '../services/repository.service';

describe('NouvelleRencontreComponent', () => {
  let component: NouvelleRencontreComponent;
  let fixture: ComponentFixture<NouvelleRencontreComponent>;

  beforeEach(async () => {
    const mockRepositoryService = {
      getMatch: jasmine.createSpy('getMatch').and.returnValue(Promise.resolve(null)),
      getAllJoueurs: jasmine.createSpy('getAllJoueurs').and.returnValue(Promise.resolve([])),
      getAllEquipes: jasmine.createSpy('getAllEquipes').and.returnValue(Promise.resolve([]))
    };

    await TestBed.configureTestingModule({
      declarations: [ NouvelleRencontreComponent ],
      imports: [ RouterTestingModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: RepositoryService, useValue: mockRepositoryService }
      ]
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
