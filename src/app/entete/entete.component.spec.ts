import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EnteteComponent } from './entete.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Match6 } from '../model/match';

describe('EnteteComponent', () => {
  let component: EnteteComponent;
  let fixture: ComponentFixture<EnteteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnteteComponent ],
      imports: [ FormsModule, NgbModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteteComponent);
    component = fixture.componentInstance;
    component.match = new Match6();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
