import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailMantainanceComponent } from './orders-detail-mantainance.component';

describe('OrderDetailMantainanceComponent', () => {
  let component: OrderDetailMantainanceComponent;
  let fixture: ComponentFixture<OrderDetailMantainanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailMantainanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailMantainanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
