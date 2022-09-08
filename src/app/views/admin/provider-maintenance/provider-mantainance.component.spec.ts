import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderMantainanceComponent } from './provider-mantainance.component';

describe('ProviderMantainanceComponent', () => {
  let component: ProviderMantainanceComponent;
  let fixture: ComponentFixture<ProviderMantainanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderMantainanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderMantainanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
