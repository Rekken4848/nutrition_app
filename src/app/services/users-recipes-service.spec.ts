import { TestBed } from '@angular/core/testing';

import { UsersRecipesService } from './users-recipes-service';

describe('UsersRecipesService', () => {
  let service: UsersRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
