import { TestBed } from '@angular/core/testing';

import { OrderSatisfactionService } from './orders-satisfaction.service';

describe('OrderSatisfactionService', () => {
  let service: OrderSatisfactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderSatisfactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
