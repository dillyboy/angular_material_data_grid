import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnsAndFiltersComponent } from './columns-and-filters.component';

describe('ColumnsAndFiltersComponent', () => {
  let component: ColumnsAndFiltersComponent;
  let fixture: ComponentFixture<ColumnsAndFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnsAndFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnsAndFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
