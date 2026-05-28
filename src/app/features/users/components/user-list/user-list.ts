import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import { User } from '../../models/user.model';

import { UserCardComponent } from '../user-card/user-card';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  readonly users = input.required<User[]>();

  readonly edit = output<User>();
}
