import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMantainanceComponent } from './product-mantainance.component';

describe('ProductMantainanceComponent', () => {
  let component: ProductMantainanceComponent;
  let fixture: ComponentFixture<ProductMantainanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMantainanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductMantainanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
