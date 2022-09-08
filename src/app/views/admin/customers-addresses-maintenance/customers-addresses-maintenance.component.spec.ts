import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersAddressesMaintenanceComponent } from './customers-addresses-maintenance.component';

describe('CustomersAddressesMaintenanceComponent', () => {
  let component: CustomersAddressesMaintenanceComponent;
  let fixture: ComponentFixture<CustomersAddressesMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersAddressesMaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersAddressesMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
