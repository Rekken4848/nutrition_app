import { TestBed } from '@angular/core/testing';

import { BodyWeightService } from './body-weight-service';

describe('BodyWeightService', () => {
  let service: BodyWeightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyWeightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
