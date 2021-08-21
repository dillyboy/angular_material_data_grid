import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDialogComponent } from './open-dialog.component';

describe('OpenDialogComponent', () => {
  let component: OpenDialogComponent;
  let fixture: ComponentFixture<OpenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
