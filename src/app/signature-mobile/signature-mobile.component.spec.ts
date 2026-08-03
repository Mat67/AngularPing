import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignatureMobileComponent } from './signature-mobile.component';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../services/repository.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SignatureMobileComponent', () => {
  let component: SignatureMobileComponent;
  let fixture: ComponentFixture<SignatureMobileComponent>;
  let mockRepositoryService: any;

  beforeEach(async () => {
    mockRepositoryService = {
      getMatch: jasmine.createSpy('getMatch').and.returnValue(Promise.resolve(null)),
      GetSignatures: jasmine.createSpy('GetSignatures').and.returnValue(Promise.resolve(null)),
      ModifierSignature: jasmine.createSpy('ModifierSignature')
    };

    await TestBed.configureTestingModule({
      declarations: [ SignatureMobileComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: RepositoryService, useValue: mockRepositoryService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  if (key === 'matchId') return 'match-1';
                  if (key === 'equipeId') return '0';
                  return null;
                }
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignatureMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
