import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectFilterComponent } from './multi-select-filter.component';

describe('MultiSelectFilterComponent', () => {
  let component: MultiSelectFilterComponent;
  let fixture: ComponentFixture<MultiSelectFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiSelectFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
