import { TestBed } from '@angular/core/testing';

import { CooperativeBoardService } from './cooperative-board.service';

describe('CooperativeBoardService', () => {
  let service: CooperativeBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CooperativeBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
