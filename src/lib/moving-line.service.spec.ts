import { TestBed } from '@angular/core/testing';

import { MovingLineService } from './moving-line.service';

describe('MovingLineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovingLineService = TestBed.get(MovingLineService);
    expect(service).toBeTruthy();
  });
});
