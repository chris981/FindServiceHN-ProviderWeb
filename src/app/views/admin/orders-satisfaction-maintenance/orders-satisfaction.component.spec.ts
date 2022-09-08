import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersSatisfactionComponent } from './orders-satisfaction.component';

describe('OrdersSatisfactionComponent', () => {
  let component: OrdersSatisfactionComponent;
  let fixture: ComponentFixture<OrdersSatisfactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersSatisfactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersSatisfactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
