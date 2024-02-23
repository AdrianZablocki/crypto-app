import { TestBed } from '@angular/core/testing';

import { CmcServiceService } from './cmc-service.service';

describe('CmcServiceService', () => {
  let service: CmcServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmcServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
