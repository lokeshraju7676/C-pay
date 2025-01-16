import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardApplicationComponent } from './credit-card-application.component';

describe('CreditCardApplicationComponent', () => {
  let component: CreditCardApplicationComponent;
  let fixture: ComponentFixture<CreditCardApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditCardApplicationComponent]
    });
    fixture = TestBed.createComponent(CreditCardApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
