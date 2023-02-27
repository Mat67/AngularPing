import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BottomBarComponent } from './bottom-bar.component';
import { Match, Match6 } from '../model/match';

describe('BottomBarComponent', () => {
  let component: BottomBarComponent;
  let fixture: ComponentFixture<BottomBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomBarComponent ]
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
