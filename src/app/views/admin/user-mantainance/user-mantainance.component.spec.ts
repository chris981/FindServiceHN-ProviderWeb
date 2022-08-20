import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMantainanceComponent } from './user-mantainance.component';

describe('UserMantainanceComponent', () => {
  let component: UserMantainanceComponent;
  let fixture: ComponentFixture<UserMantainanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMantainanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMantainanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
