import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayhoursMantainanceComponent } from './dayhours-mantainance.component';

describe('DayhoursMantainanceComponent', () => {
  let component: DayhoursMantainanceComponent;
  let fixture: ComponentFixture<DayhoursMantainanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayhoursMantainanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayhoursMantainanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
