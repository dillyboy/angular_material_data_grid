import { TestBed } from '@angular/core/testing';

import { AngularMaterialDataGridService } from './angular-material-data-grid.service';

describe('AngularMaterialDataGridService', () => {
  let service: AngularMaterialDataGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularMaterialDataGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
