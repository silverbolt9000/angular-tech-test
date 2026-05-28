import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Generics } from './generics';

describe('Generics', () => {
  let component: Generics;
  let fixture: ComponentFixture<Generics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Generics],
    }).compileComponents();

    fixture = TestBed.createComponent(Generics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
