import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentpreviewComponent } from './paymentpreview.component';

describe('PaymentpreviewComponent', () => {
  let component: PaymentpreviewComponent;
  let fixture: ComponentFixture<PaymentpreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentpreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
