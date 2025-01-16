import { TestBed } from '@angular/core/testing';

import { CreditCardApplicationService } from './credit-card-application.service';

describe('CreditCardApplicationService', () => {
  let service: CreditCardApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
