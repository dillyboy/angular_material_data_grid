import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridWithinDialogComponent } from './grid-within-dialog.component';

describe('GridWithinDialogComponent', () => {
  let component: GridWithinDialogComponent;
  let fixture: ComponentFixture<GridWithinDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridWithinDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridWithinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
