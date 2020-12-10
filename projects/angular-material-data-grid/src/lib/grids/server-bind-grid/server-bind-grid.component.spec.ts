import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerBindGridComponent } from './server-bind-grid.component';

describe('ServerBindGridComponent', () => {
  let component: ServerBindGridComponent;
  let fixture: ComponentFixture<ServerBindGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerBindGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerBindGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
