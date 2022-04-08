/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetInvestorsService } from './getInvestors.service';

describe('Service: GetInvestors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetInvestorsService]
    });
  });

  it('should ...', inject([GetInvestorsService], (service: GetInvestorsService) => {
    expect(service).toBeTruthy();
  }));
});
