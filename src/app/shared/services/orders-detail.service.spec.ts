import { TestBed } from '@angular/core/testing';

import { OrdersDetailService } from './orders-detail.service';

describe('OrdersDetailService', () => {
  let service: OrdersDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
