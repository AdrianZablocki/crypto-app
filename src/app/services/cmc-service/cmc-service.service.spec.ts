import { TestBed } from '@angular/core/testing';

import { CmcService } from './cmc.service';

describe('CmcServiceService', () => {
  let service: CmcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
