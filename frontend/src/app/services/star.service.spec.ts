import {TestBed} from '@angular/core/testing';

import {StarService} from './star.service';

describe('StarService', () => {
  let service: StarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
