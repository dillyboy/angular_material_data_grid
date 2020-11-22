import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericFilterComponent } from './numeric-filter.component';

describe('NumericFilterComponent', () => {
  let component: NumericFilterComponent;
  let fixture: ComponentFixture<NumericFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumericFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
