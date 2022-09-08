import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersMaintenanceComponent } from './customers-maintenance.component';

describe('CustomersMaintenanceComponent', () => {
  let component: CustomersMaintenanceComponent;
  let fixture: ComponentFixture<CustomersMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersMaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
