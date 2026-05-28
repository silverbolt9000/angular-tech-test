import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Refactor } from './refactor';

describe('Refactor', () => {
  let component: Refactor;
  let fixture: ComponentFixture<Refactor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Refactor],
    }).compileComponents();

    fixture = TestBed.createComponent(Refactor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
