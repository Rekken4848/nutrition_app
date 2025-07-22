import { TestBed } from '@angular/core/testing';

import { RecipeInstructionService } from './recipe-instruction-service';

describe('RecipeInstructionService', () => {
  let service: RecipeInstructionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeInstructionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
