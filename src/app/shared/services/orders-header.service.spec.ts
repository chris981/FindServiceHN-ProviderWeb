import { TestBed } from '@angular/core/testing';

import { OrderHeaderService } from './orders-header.service';

describe('OrderHeaderService', () => {
  let service: OrderHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
