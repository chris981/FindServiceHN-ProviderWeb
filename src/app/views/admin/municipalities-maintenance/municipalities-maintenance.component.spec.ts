import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalitiesMaintenanceComponent } from './municipalities-maintenance.component';

describe('MunicipalitiesMaintenanceComponent', () => {
  let component: MunicipalitiesMaintenanceComponent;
  let fixture: ComponentFixture<MunicipalitiesMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunicipalitiesMaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MunicipalitiesMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
