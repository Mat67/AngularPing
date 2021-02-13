import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnteteComponent } from './entete.component';

describe('EnteteComponent', () => {
  let component: EnteteComponent;
  let fixture: ComponentFixture<EnteteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnteteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
