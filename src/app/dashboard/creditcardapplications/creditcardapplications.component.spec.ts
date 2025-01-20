import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditcardapplicationsComponent } from './creditcardapplications.component';

describe('CreditcardapplicationsComponent', () => {
  let component: CreditcardapplicationsComponent;
  let fixture: ComponentFixture<CreditcardapplicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditcardapplicationsComponent]
    });
    fixture = TestBed.createComponent(CreditcardapplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
