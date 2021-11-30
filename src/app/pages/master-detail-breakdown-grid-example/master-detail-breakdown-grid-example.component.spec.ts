import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDetailBreakdownGridExampleComponent } from './master-detail-breakdown-grid-example.component';

describe('MasterDetailBreakdownGridExampleComponent', () => {
  let component: MasterDetailBreakdownGridExampleComponent;
  let fixture: ComponentFixture<MasterDetailBreakdownGridExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterDetailBreakdownGridExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDetailBreakdownGridExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
