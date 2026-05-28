import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { User } from '../../../features/users/models/user.model';

import { UserFormComponent } from '../../../features/users/components/user-form/user-form';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    UserFormComponent,
  ],
  templateUrl: './user-modal.html',
  styleUrls: ['./user-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserModalComponent {
  readonly dialogRef =
    inject(MatDialogRef<UserModalComponent>);

  readonly user =
    inject<User | null>(MAT_DIALOG_DATA);

  onSave(user: Omit<User, 'id'> | User): void {
    this.dialogRef.close(user);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
