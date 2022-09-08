import { TestBed } from '@angular/core/testing';

import { ProvidersAttentionService } from './providers-attention.service';

describe('ProvidersAttentionService', () => {
  let service: ProvidersAttentionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvidersAttentionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
