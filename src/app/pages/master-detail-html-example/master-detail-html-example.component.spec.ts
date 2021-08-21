import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDetailHtmlExampleComponent } from './master-detail-html-example.component';

describe('MasterDetailHtmlExampleComponent', () => {
  let component: MasterDetailHtmlExampleComponent;
  let fixture: ComponentFixture<MasterDetailHtmlExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterDetailHtmlExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDetailHtmlExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
