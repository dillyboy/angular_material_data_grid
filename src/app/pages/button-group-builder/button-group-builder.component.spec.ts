import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGroupBuilderComponent } from './button-group-builder.component';

describe('ButtonGroupBuilderComponent', () => {
  let component: ButtonGroupBuilderComponent;
  let fixture: ComponentFixture<ButtonGroupBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonGroupBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGroupBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
