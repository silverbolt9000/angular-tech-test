import { Injectable, inject } from '@angular/core';

import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';

import {
  catchError,
  map,
  of,
  switchMap,
} from 'rxjs';

import * as TodoActions from './todo.actions';

import { TodoApiService } from '../services/todo-api.service';

@Injectable()
export class TodoEffects {
  private readonly actions$ =
    inject(Actions);

  private readonly todoApiService =
    inject(TodoApiService);

  readonly loadTodos$ =
    createEffect(() =>
      this.actions$.pipe(
        ofType(
          TodoActions.loadTodos
        ),

        switchMap(() =>
          this.todoApiService
            .getTodos()
            .pipe(
              map((todos) =>
                TodoActions.loadTodosSuccess(
                  {
                    todos,
                  }
                )
              ),

              catchError(() =>
                of(
                  TodoActions.loadTodosError(
                    {
                      error:
                        'Erro ao carregar tarefas',
                    }
                  )
                )
              )
            )
        )
      )
    );
}
