import { TestBed } from '@angular/core/testing';

import { DayhoursService } from './dayhours.service';

describe('DayhoursService', () => {
  let service: DayhoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayhoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
