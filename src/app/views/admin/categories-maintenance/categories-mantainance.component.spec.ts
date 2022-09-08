import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesMantainanceComponent } from './categories-mantainance.component';

describe('CategoriesMantainanceComponent', () => {
  let component: CategoriesMantainanceComponent;
  let fixture: ComponentFixture<CategoriesMantainanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesMantainanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesMantainanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
