import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardServiceComponent } from './credit-card-service.component';

describe('CreditCardServiceComponent', () => {
  let component: CreditCardServiceComponent;
  let fixture: ComponentFixture<CreditCardServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditCardServiceComponent]
    });
    fixture = TestBed.createComponent(CreditCardServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
