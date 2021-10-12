import { TestBed } from '@angular/core/testing';

import { CooperativeMembersService } from './cooperative-members.service';

describe('CooperativeMembersService', () => {
  let service: CooperativeMembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CooperativeMembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
