import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesMaintenanceComponent } from './countries-maintenance.component';

describe('CountriesMaintenanceComponent', () => {
  let component: CountriesMaintenanceComponent;
  let fixture: ComponentFixture<CountriesMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesMaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountriesMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
