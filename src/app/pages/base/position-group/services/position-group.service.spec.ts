import { TestBed } from '@angular/core/testing';

import { PositionGroupService } from './position-group.service';

describe('PositionGroupService', () => {
  let service: PositionGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PositionGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
