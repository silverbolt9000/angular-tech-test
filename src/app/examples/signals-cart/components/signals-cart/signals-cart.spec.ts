import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsCart } from './signals-cart';

describe('SignalsCart', () => {
  let component: SignalsCart;
  let fixture: ComponentFixture<SignalsCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsCart],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalsCart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
