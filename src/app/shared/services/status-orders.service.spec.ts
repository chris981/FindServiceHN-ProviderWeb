import { TestBed } from '@angular/core/testing';

import { StatusOrdersService } from './status-orders.service';

describe('StatusOrdersService', () => {
  let service: StatusOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
