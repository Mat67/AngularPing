import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PrintPageComponent } from './print-page.component';
import { Match6 } from '../model/match';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SplitPipe } from '../pipe/split-pipe';

describe('PrintPageComponent', () => {
  let component: PrintPageComponent;
  let fixture: ComponentFixture<PrintPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintPageComponent, SplitPipe ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPageComponent);
    component = fixture.componentInstance;
    component.match = new Match6();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
