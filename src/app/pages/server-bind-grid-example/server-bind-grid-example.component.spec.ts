import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerBindGridExampleComponent } from './server-bind-grid-example.component';

describe('ServerBindGridExampleComponent', () => {
  let component: ServerBindGridExampleComponent;
  let fixture: ComponentFixture<ServerBindGridExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerBindGridExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerBindGridExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
