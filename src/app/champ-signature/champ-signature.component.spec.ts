import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChampSignatureComponent } from './champ-signature.component';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
import { SimpleChange } from '@angular/core';

describe('ChampSignatureComponent', () => {
  let component: ChampSignatureComponent;
  let fixture: ComponentFixture<ChampSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampSignatureComponent ],
      imports: [ AngularSignaturePadModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear or set signature on ngOnChanges', () => {
    const mockSignaturePad = {
      clear: jasmine.createSpy('clear'),
      fromDataURL: jasmine.createSpy('fromDataURL')
    };
    component.signaturePad = mockSignaturePad as any;

    component.ngOnChanges({
      signature: new SimpleChange(null, '', false)
    });
    expect(mockSignaturePad.clear).toHaveBeenCalled();

    component.ngOnChanges({
      signature: new SimpleChange(null, 'data:image/png;base64,123', false)
    });
    expect(mockSignaturePad.fromDataURL).toHaveBeenCalledWith('data:image/png;base64,123');
  });

  it('should emit onSignatureChanged on drawComplete', () => {
    const mockSignaturePad = {
      toDataURL: jasmine.createSpy('toDataURL').and.returnValue('data:image/png;base64,abc')
    };
    component.signaturePad = mockSignaturePad as any;
    spyOn(component.onSignatureChanged, 'emit');

    component.drawComplete({} as any);

    expect(mockSignaturePad.toDataURL).toHaveBeenCalled();
    expect(component.onSignatureChanged.emit).toHaveBeenCalledWith('data:image/png;base64,abc');
  });
});
