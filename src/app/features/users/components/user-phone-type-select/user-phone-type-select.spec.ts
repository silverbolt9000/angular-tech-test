import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPhoneTypeSelect } from './user-phone-type-select';

describe('UserPhoneTypeSelect', () => {
  let component: UserPhoneTypeSelect;
  let fixture: ComponentFixture<UserPhoneTypeSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPhoneTypeSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPhoneTypeSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
