import { TestBed } from '@angular/core/testing';

import { OrdersHeaderService } from './orders-header.service';

describe('OrdersHeaderService', () => {
  let service: OrdersHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
