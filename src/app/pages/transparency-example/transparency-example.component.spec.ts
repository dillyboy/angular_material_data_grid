import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransparencyExampleComponent } from './transparency-example.component';

describe('TransparencyExampleComponent', () => {
  let component: TransparencyExampleComponent;
  let fixture: ComponentFixture<TransparencyExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransparencyExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransparencyExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
