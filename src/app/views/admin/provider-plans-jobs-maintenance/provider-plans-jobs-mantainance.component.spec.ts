import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderPlansJobsMantainanceComponent } from './provider-plans-jobs-mantainance.component';

describe('ProviderPlansJobsMantainanceComponent', () => {
  let component: ProviderPlansJobsMantainanceComponent;
  let fixture: ComponentFixture<ProviderPlansJobsMantainanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderPlansJobsMantainanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderPlansJobsMantainanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
