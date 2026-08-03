import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RencontreMobileComponent } from './rencontre-mobile.component';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../services/repository.service';
import { FormsModule } from '@angular/forms';
import { RencontreSimple } from '../model/rencontre';
import { Joueur } from '../model/joueur';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RencontreMobileComponent', () => {
  let component: RencontreMobileComponent;
  let fixture: ComponentFixture<RencontreMobileComponent>;
  let mockRepositoryService: any;

  beforeEach(async () => {
    const mockRencontre = new RencontreSimple(new Joueur('A'), new Joueur('U'));
    mockRencontre.manches = [
      { score: '' },
      { score: '' },
      { score: '' },
      { score: '' },
      { score: '' }
    ] as any;

    mockRepositoryService = {
      getMatch: jasmine.createSpy('getMatch').and.returnValue(Promise.resolve({
        rencontres: {
          '1': mockRencontre
        }
      })),
      sauvegarderMatch: jasmine.createSpy('sauvegarderMatch').and.returnValue(Promise.resolve())
    };

    await TestBed.configureTestingModule({
      declarations: [ RencontreMobileComponent ],
      imports: [ FormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: RepositoryService, useValue: mockRepositoryService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  if (key === 'matchId') return 'match-123';
                  if (key === 'rencontreId') return '1';
                  return null;
                }
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RencontreMobileComponent);
    component = fixture.componentInstance;
    component.rencontre = mockRencontre;
    fixture.detectChanges();
  });

  it('should create and load match data', async () => {
    expect(component).toBeTruthy();
    expect(component.matchId).toBe('match-123');
    expect(component.rencontreId).toBe('1');
    expect(mockRepositoryService.getMatch).toHaveBeenCalledWith('match-123');
  });

  it('should update manches score and call sauvegarderMatch on onSubmit', () => {
    component.match = { id: 'match-123' } as any;

    component.scoreA1 = 11;
    component.scoreB1 = 9;
    component.scoreA2 = 11;
    component.scoreB2 = 7;

    component.onSubmit();

    expect(component.rencontre.manches[0].score).toBe('11-9');
    expect(component.rencontre.manches[1].score).toBe('11-7');
    expect(mockRepositoryService.sauvegarderMatch).toHaveBeenCalledWith(component.match);
  });
});
