import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMaterialDataGridComponent } from './angular-material-data-grid.component';

describe('AngularMaterialDataGridComponent', () => {
  let component: AngularMaterialDataGridComponent;
  let fixture: ComponentFixture<AngularMaterialDataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularMaterialDataGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularMaterialDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
