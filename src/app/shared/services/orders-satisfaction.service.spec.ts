import { TestBed } from '@angular/core/testing';

import { OrdersSatisfactionService } from './orders-satisfaction.service';

describe('OrdersSatisfactionService', () => {
  let service: OrdersSatisfactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersSatisfactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
