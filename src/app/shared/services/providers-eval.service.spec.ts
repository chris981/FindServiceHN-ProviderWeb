import { TestBed } from '@angular/core/testing';

import { ProvidersEvalService } from './providers-eval.service';

describe('ProvidersEvalService', () => {
  let service: ProvidersEvalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvidersEvalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
