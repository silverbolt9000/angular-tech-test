import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

interface UserItem {
  id: number;

  nome: string;

  ativo: boolean;
}

@Component({
  selector:
    'app-performance-demo',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
  ],

  templateUrl:
    './performance.html',

  styleUrls: [
    './performance.scss',
  ],

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class PerformanceDemoComponent {
  readonly users = signal<UserItem[]>(
    Array.from(
      { length: 300 },
      (_, index) => ({
        id: index + 1,
        nome: `Usuário ${index + 1
          }`,
        ativo: Math.random() > 0.5,
      })
    )
  );

  readonly filter =
    signal('');

  readonly filteredUsers =
    computed(() => {
      const filterValue =
        this.filter()
          .toLowerCase();

      return this.users().filter(
        (user) =>
          user.nome
            .toLowerCase()
            .includes(
              filterValue
            )
      );
    });

  updateRandomUser(): void {
    const updated =
      [...this.users()];

    const randomIndex =
      Math.floor(
        Math.random() *
        updated.length
      );

    updated[randomIndex] = {
      ...updated[randomIndex],
      ativo:
        !updated[randomIndex]
          .ativo,
    };

    this.users.set(updated);
  }

  trackById(
    _: number,
    item: UserItem
  ): number {
    return item.id;
  }
}
