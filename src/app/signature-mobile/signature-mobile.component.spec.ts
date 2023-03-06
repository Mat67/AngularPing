import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureMobileComponent } from './signature-mobile.component';

describe('SignatureMobileComponent', () => {
  let component: SignatureMobileComponent;
  let fixture: ComponentFixture<SignatureMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignatureMobileComponent ]
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
