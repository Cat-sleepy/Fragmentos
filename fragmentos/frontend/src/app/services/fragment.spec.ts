import { TestBed } from '@angular/core/testing';

import { Fragment } from './fragment';

describe('Fragment', () => {
  let service: Fragment;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fragment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
