import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
} from '@angular/core';

import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  of,
  Subject,
} from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { User } from '../models/user.model';

import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class UsersStore {
  private readonly usersService =
    inject(UsersService);

  readonly users = signal<User[]>([]);

  readonly loading = signal(false);

  readonly error = signal<string | null>(null);

  readonly searchTerm = signal('');

  readonly filteredUsers = computed(() =>
    this.users()
  );

  private readonly searchSubject =
    new Subject<string>();

  constructor() {
    this.setupSearch();

    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);

    this.usersService
      .getUsers()
      .pipe(
        catchError(() => {
          this.error.set(
            'Erro ao carregar usuários'
          );

          return of([]);
        })
      )
      .subscribe((users) => {
        this.users.set(users);

        this.loading.set(false);
      });
  }

  updateSearchTerm(term: string): void {
    this.searchTerm.set(term);

    this.searchSubject.next(term);
  }

  private setupSearch(): void {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),

        switchMap((term) =>
          this.usersService.searchUsers(term).pipe(
            catchError(() => {
              this.error.set(
                'Erro ao buscar usuários'
              );

              return of([]);
            })
          )
        ),

        takeUntilDestroyed()
      )
      .subscribe((users) => {
        this.users.set(users);
      });
  }

  createUser(user: Omit<User, 'id'>): void {
    const newUser: User = {
      ...user,
      id: Math.floor(Math.random() * 1000000),
    };

    this.users.update((users) => [
      newUser,
      ...users,
    ]);
  }

  updateUser(updatedUser: User): void {
    this.users.update((users) =>
      users.map((user) =>
        user.id === updatedUser.id
          ? updatedUser
          : user
      )
    );
  }
}
