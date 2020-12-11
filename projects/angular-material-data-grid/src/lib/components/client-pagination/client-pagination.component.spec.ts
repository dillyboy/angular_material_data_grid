import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPaginationComponent } from './client-pagination.component';

describe('ClientPaginationComponent', () => {
  let component: ClientPaginationComponent;
  let fixture: ComponentFixture<ClientPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientPaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
