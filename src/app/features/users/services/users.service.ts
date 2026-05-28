import { Injectable, signal } from '@angular/core';
import { Observable, delay, map, of, throwError } from 'rxjs';

import { User } from '../models/user.model';
import { usersMock } from '../mocks/users.mock';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly users = signal<User[]>([...usersMock]);

  getUsers(): Observable<User[]> {
    return of(this.users()).pipe(delay(800));
  }
  searchUsers(term: string): Observable<User[]> {
    return of(this.users()).pipe(
      delay(500),

      map((users) => {
        if (!term.trim()) {
          return users;
        }

        return users.filter((user) =>
          user.nome.toLowerCase().includes(term.toLowerCase())
        );
      })
    );
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    const newUser: User = {
      ...user,
      id: this.generateId(),
    };

    this.users.update((users) => [...users, newUser]);

    return of(newUser).pipe(delay(500));
  }

  updateUser(updatedUser: User): Observable<User> {
    const userExists = this.users().some(
      (user) => user.id === updatedUser.id
    );

    if (!userExists) {
      return throwError(() => new Error('Usuário não encontrado'));
    }

    this.users.update((users) =>
      users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );

    return of(updatedUser).pipe(delay(500));
  }

  getUserById(userId: number): Observable<User | undefined> {
    return of(
      this.users().find((user) => user.id === userId)
    ).pipe(delay(300));
  }

  deleteUser(userId: number): Observable<void> {
    this.users.update((users) =>
      users.filter((user) => user.id !== userId)
    );

    return of(void 0).pipe(delay(500));
  }

  private generateId(): number {
    const users = this.users();

    if (!users.length) {
      return 1;
    }

    return Math.max(...users.map((user) => user.id)) + 1;
  }
}
