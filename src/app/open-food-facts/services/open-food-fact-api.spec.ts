import { TestBed } from '@angular/core/testing';

import { OpenFoodFactApi } from './open-food-fact-api';

describe('OpenFoodFactApi', () => {
  let service: OpenFoodFactApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenFoodFactApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
