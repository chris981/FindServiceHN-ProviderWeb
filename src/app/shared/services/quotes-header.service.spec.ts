import { TestBed } from '@angular/core/testing';

import { QuotesHeaderService } from './quotes-header.service';

describe('QuotesHeaderService', () => {
  let service: QuotesHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuotesHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
