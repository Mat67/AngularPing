import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatchDetailComponent } from './match-detail.component';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../services/repository.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MatchDetailComponent', () => {
  let component: MatchDetailComponent;
  let fixture: ComponentFixture<MatchDetailComponent>;

  beforeEach(waitForAsync(() => {
    const mockRepositoryService = {
      getMatch: jasmine.createSpy('getMatch').and.returnValue(Promise.resolve(null)),
      GetSignatures: jasmine.createSpy('GetSignatures').and.returnValue(Promise.resolve(null)),
      getAllJoueurs: jasmine.createSpy('getAllJoueurs').and.returnValue(Promise.resolve([])),
      getAllEquipes: jasmine.createSpy('getAllEquipes').and.returnValue(Promise.resolve([]))
    };

    TestBed.configureTestingModule({
      declarations: [ MatchDetailComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: RepositoryService, useValue: mockRepositoryService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => 'match-1'
              }
            },
            data: {
              subscribe: (fn: any) => fn({ match: null })
            }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
