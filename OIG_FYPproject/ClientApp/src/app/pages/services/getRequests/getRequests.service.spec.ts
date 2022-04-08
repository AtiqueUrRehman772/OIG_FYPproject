/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetRequestsService } from './getRequests.service';

describe('Service: GetRequests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetRequestsService]
    });
  });

  it('should ...', inject([GetRequestsService], (service: GetRequestsService) => {
    expect(service).toBeTruthy();
  }));
});
