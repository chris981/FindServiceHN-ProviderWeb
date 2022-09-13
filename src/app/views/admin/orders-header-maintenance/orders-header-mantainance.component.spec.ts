import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHeaderMantainanceComponent } from './orders-header-mantainance.component';

describe('OrderHeaderMantainanceComponent', () => {
  let component: OrderHeaderMantainanceComponent;
  let fixture: ComponentFixture<OrderHeaderMantainanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderHeaderMantainanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderHeaderMantainanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
