import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../../models/user.model';
import { UsersStore } from '../../store/users.store';
import { UserListComponent } from '../../components/user-list/user-list';
import { UserSearchComponent } from '../../components/user-search/user-search';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state';
import { UserModalComponent } from '../../dialogs/user-modal';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    UserListComponent,
    UserSearchComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './users-page.html',
  styleUrl: './users-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent implements OnInit {
  private readonly dialog = inject(MatDialog);

  private readonly destroyRef = inject(DestroyRef);

  readonly usersStore = inject(UsersStore);

  ngOnInit(): void {
  }

  onSearch(term: string): void {
    this.usersStore.updateSearchTerm(term);
  }

  onCreateUser(): void {
    const dialogRef = this.dialog.open(
      UserModalComponent,
      {
        width: '700px',
        maxWidth: '95vw',
        panelClass: 'user-dialog',
        autoFocus: false,
        restoreFocus: false,
        data: null,
      }
    );

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (!result) {
          return;
        }

        this.usersStore.createUser(result);
      });
  }

  onEditUser(user: User): void {
    const dialogRef = this.dialog.open(
      UserModalComponent,
      {
        width: '700px',
        maxWidth: '95vw',
        panelClass: 'user-dialog',
        autoFocus: false,
        restoreFocus: false,
        data: user,
      }
    );

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (!result) {
          return;
        }

        this.usersStore.updateUser(result);
      });
  }
}
