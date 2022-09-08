import { TestBed } from '@angular/core/testing';

import { ServiceStatusService } from './service-status.service';

describe('ServiceStatusService', () => {
  let service: ServiceStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
