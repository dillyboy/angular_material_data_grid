import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTypeComponent } from './image-type.component';

describe('ImageTypeComponent', () => {
  let component: ImageTypeComponent;
  let fixture: ComponentFixture<ImageTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
