import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellStylesExampleComponent } from './cell-styles-example.component';

describe('CellStylesExampleComponent', () => {
  let component: CellStylesExampleComponent;
  let fixture: ComponentFixture<CellStylesExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellStylesExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellStylesExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
