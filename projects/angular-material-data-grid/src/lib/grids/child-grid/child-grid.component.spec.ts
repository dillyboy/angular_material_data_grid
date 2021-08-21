import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildGridComponent } from './child-grid.component';

describe('ChildGridComponent', () => {
  let component: ChildGridComponent;
  let fixture: ComponentFixture<ChildGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
