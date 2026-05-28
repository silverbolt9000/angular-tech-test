import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { PhoneType } from '../../models/phone-type.enum';

@Component({
  selector: 'app-user-phone-type-select',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl:
    './user-phone-type-select.html',
  styleUrl:
    './user-phone-type-select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPhoneTypeSelectComponent {
  readonly control =
    input.required<FormControl>();

  readonly phoneTypes = Object.values(PhoneType);
}
