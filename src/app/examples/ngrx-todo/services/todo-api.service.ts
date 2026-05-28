import { Injectable } from '@angular/core';

import {
  delay,
  Observable,
  of,
} from 'rxjs';

import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  getTodos(): Observable<Todo[]> {
    return of([
      {
        id: 1,
        titulo:
          'Estudar Angular Signals',
        completed: false,
      },
      {
        id: 2,
        titulo:
          'Implementar NgRx',
        completed: true,
      },
      {
        id: 3,
        titulo:
          'Criar testes unitários',
        completed: false,
      },
    ]).pipe(delay(1000));
  }
}
