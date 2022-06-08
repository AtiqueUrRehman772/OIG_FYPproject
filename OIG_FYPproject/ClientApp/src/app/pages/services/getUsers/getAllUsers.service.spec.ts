/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetAllUsersService } from './getAllUsers.service';

describe('Service: GetAllUsers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetAllUsersService]
    });
  });

  it('should ...', inject([GetAllUsersService], (service: GetAllUsersService) => {
    expect(service).toBeTruthy();
  }));
});
