import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSatisfactionMantainanceComponent } from './orders-satisfaction-mantainance.component';

describe('OrderSatisfactionMantainanceComponent', () => {
  let component: OrderSatisfactionMantainanceComponent;
  let fixture: ComponentFixture<OrderSatisfactionMantainanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSatisfactionMantainanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSatisfactionMantainanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
