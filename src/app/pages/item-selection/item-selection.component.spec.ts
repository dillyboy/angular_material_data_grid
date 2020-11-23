import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSelectionComponent } from './item-selection.component';

describe('ItemSelectionComponent', () => {
  let component: ItemSelectionComponent;
  let fixture: ComponentFixture<ItemSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
