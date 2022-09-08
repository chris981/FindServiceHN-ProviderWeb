import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersEvalComponent } from './providers-eval.component';

describe('ProvidersEvalComponent', () => {
  let component: ProvidersEvalComponent;
  let fixture: ComponentFixture<ProvidersEvalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidersEvalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidersEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
