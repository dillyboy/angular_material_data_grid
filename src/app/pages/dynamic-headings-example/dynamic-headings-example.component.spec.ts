import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicHeadingsExampleComponent } from './dynamic-headings-example.component';

describe('DynamicHeadingsExampleComponent', () => {
  let component: DynamicHeadingsExampleComponent;
  let fixture: ComponentFixture<DynamicHeadingsExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicHeadingsExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicHeadingsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
