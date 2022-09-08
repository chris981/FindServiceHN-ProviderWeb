import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceStatusMantainanceComponent } from './service-status-mantainance.component';

describe('ServiceStatusMantainanceComponent', () => {
  let component: ServiceStatusMantainanceComponent;
  let fixture: ComponentFixture<ServiceStatusMantainanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceStatusMantainanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceStatusMantainanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
