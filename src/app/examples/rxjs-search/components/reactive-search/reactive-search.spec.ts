import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveSearch } from './reactive-search';

describe('ReactiveSearch', () => {
  let component: ReactiveSearch;
  let fixture: ComponentFixture<ReactiveSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
