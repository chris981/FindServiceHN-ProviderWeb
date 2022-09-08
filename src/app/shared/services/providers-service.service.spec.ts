import { TestBed } from '@angular/core/testing';

import { ProvidersServiceService } from './providers-service.service';

describe('ProvidersServiceService', () => {
  let service: ProvidersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvidersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
