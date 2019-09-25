import { TestBed } from '@angular/core/testing';

import { PetbookService } from './petbook.service';

describe('PetbookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PetbookService = TestBed.get(PetbookService);
    expect(service).toBeTruthy();
  });
});
