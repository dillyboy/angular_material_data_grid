import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedHeaderComponent } from './fixed-header.component';

describe('FixedHeaderComponent', () => {
  let component: FixedHeaderComponent;
  let fixture: ComponentFixture<FixedHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
