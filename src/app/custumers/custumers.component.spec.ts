import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustumersComponent } from './custumers.component';

describe('CustumersComponent', () => {
  let component: CustumersComponent;
  let fixture: ComponentFixture<CustumersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustumersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustumersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
