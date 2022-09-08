import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderServiceMantainanceComponent } from './provider-service-mantainance.component';

describe('ProviderServiceMantainanceComponent', () => {
  let component: ProviderServiceMantainanceComponent;
  let fixture: ComponentFixture<ProviderServiceMantainanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderServiceMantainanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderServiceMantainanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
