import { TestBed } from '@angular/core/testing';

import { QuotesDetailService } from './quotes-detail.service';

describe('QuotesDetailService', () => {
  let service: QuotesDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuotesDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
