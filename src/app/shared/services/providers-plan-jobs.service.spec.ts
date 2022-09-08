import { TestBed } from '@angular/core/testing';

import { ProvidersPlanJobsService } from './providers-plan-jobs.service';

describe('ProvidersPlanJobsService', () => {
  let service: ProvidersPlanJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvidersPlanJobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
