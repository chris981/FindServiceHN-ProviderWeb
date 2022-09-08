import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersAttentionComponent } from './providers-attention.component';

describe('ProvidersAttentionComponent', () => {
  let component: ProvidersAttentionComponent;
  let fixture: ComponentFixture<ProvidersAttentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidersAttentionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidersAttentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
