import { TestBed } from '@angular/core/testing';

import { PrefixService } from './prefix.service';

describe('PermissionService', () => {
  let service: PrefixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrefixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
