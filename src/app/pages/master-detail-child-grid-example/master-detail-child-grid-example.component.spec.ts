import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDetailChildGridExampleComponent } from './master-detail-child-grid-example.component';

describe('MasterDetailChildGridExampleComponent', () => {
  let component: MasterDetailChildGridExampleComponent;
  let fixture: ComponentFixture<MasterDetailChildGridExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterDetailChildGridExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDetailChildGridExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
