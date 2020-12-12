import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSidePaginationGridExampleComponent } from './client-side-pagination-grid-example.component';

describe('ClientSidePaginationGridExampleComponent', () => {
  let component: ClientSidePaginationGridExampleComponent;
  let fixture: ComponentFixture<ClientSidePaginationGridExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSidePaginationGridExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSidePaginationGridExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
