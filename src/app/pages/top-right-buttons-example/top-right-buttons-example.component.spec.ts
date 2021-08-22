import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRightButtonsExampleComponent } from './top-right-buttons-example.component';

describe('TopRightButtonsExampleComponent', () => {
  let component: TopRightButtonsExampleComponent;
  let fixture: ComponentFixture<TopRightButtonsExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopRightButtonsExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRightButtonsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
