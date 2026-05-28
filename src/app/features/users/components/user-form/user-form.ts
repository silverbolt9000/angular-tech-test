import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
  output,
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { User } from '../../models/user.model';
import { PhoneType } from '../../models/phone-type.enum';

import { UserPhoneTypeSelectComponent } from '../user-phone-type-select/user-phone-type-select';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    UserPhoneTypeSelectComponent,
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  readonly user = input<User | null>(null);

  readonly save = output<Omit<User, 'id'> | User>();

  readonly form = new FormGroup({
    nome: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
      ],
    }),

    cpf: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    telefone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    tipoTelefone: new FormControl<PhoneType>(
      PhoneType.CELULAR,
      {
        nonNullable: true,
        validators: [Validators.required],
      }
    ),
  });

  ngOnInit(): void {
    const user = this.user();

    if (!user) {
      return;
    }

    this.form.patchValue(user);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    const formValue = this.form.getRawValue();

    const user = this.user();

    if (user) {
      this.save.emit({
        ...user,
        ...formValue,
      });

      return;
    }

    this.save.emit(formValue);
  }
}
