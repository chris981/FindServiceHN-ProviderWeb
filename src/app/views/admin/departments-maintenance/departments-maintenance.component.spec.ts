import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsMaintenanceComponent } from './departments-maintenance.component';

describe('DepartmentsMaintenanceComponent', () => {
  let component: DepartmentsMaintenanceComponent;
  let fixture: ComponentFixture<DepartmentsMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentsMaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
