import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastsContainer } from './toasts-container.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ToastsContainer', () => {
  let component: ToastsContainer;
  let fixture: ComponentFixture<ToastsContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ToastsContainer, NgbToastModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
