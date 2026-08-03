import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BottomBarComponent } from './bottom-bar.component';
import { Match6 } from '../model/match';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BottomBarComponent', () => {
  let component: BottomBarComponent;
  let fixture: ComponentFixture<BottomBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomBarComponent ],
      imports: [ RouterTestingModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomBarComponent);
    component = fixture.componentInstance;
    component.match = new Match6();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
