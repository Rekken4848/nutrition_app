import { TestBed } from '@angular/core/testing';

import { TemperatureHumidityService } from './temperature-humidity-service';

describe('TemperatureHumidityService', () => {
  let service: TemperatureHumidityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemperatureHumidityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
