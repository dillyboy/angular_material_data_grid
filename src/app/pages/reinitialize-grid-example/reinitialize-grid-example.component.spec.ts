import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinitializeGridExampleComponent } from './reinitialize-grid-example.component';

describe('ReinitializeGridExampleComponent', () => {
  let component: ReinitializeGridExampleComponent;
  let fixture: ComponentFixture<ReinitializeGridExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReinitializeGridExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReinitializeGridExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
