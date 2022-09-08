import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriesMantainanceComponent } from './subcategories-mantainance.component';

describe('SubcategoriesMantainanceComponent', () => {
  let component: SubcategoriesMantainanceComponent;
  let fixture: ComponentFixture<SubcategoriesMantainanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoriesMantainanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoriesMantainanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
