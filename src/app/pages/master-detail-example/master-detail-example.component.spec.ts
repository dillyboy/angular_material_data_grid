import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDetailExampleComponent } from './master-detail-example.component';

describe('MasterDetailExampleComponent', () => {
  let component: MasterDetailExampleComponent;
  let fixture: ComponentFixture<MasterDetailExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterDetailExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDetailExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
