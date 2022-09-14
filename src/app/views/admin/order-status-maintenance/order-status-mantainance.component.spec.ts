import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderStatusMantainanceComponent } from './order-status-mantainance.component';

describe('OrderStatusMantainanceComponent', () => {
    let component: OrderStatusMantainanceComponent;
    let fixture: ComponentFixture<OrderStatusMantainanceComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ OrderStatusMantainanceComponent ]
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(OrderStatusMantainanceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
  