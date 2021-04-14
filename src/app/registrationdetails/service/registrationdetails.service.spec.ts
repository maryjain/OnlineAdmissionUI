import { TestBed } from '@angular/core/testing';

import { RegistrationdetailsService } from './registrationdetails.service';

describe('RegistrationdetailsService', () => {
  let service: RegistrationdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
