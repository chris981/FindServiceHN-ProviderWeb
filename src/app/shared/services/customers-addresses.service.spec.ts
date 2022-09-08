import { TestBed } from '@angular/core/testing';

import { CustomersAddressesService } from './customers-addresses.service';

describe('CustomersAddressesService', () => {
  let service: CustomersAddressesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomersAddressesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
