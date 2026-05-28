import {
  createReducer,
  on,
} from '@ngrx/store';

import {
  initialState,
  TodoState,
} from './todo.state';

import * as TodoActions from './todo.actions';

export const todoFeatureKey =
  'todo';

export const todoReducer =
  createReducer(
    initialState,

    on(
      TodoActions.loadTodos,
      (state): TodoState => ({
        ...state,

        loading: true,

        error: null,
      })
    ),

    on(
      TodoActions.loadTodosSuccess,
      (
        state,
        { todos }
      ): TodoState => ({
        ...state,

        todos,

        loading: false,
      })
    ),

    on(
      TodoActions.loadTodosError,
      (
        state,
        { error }
      ): TodoState => ({
        ...state,

        error,

        loading: false,
      })
    ),

    on(
      TodoActions.toggleTodoComplete,
      (
        state,
        { todoId }
      ): TodoState => ({
        ...state,

        todos: state.todos.map(
          (todo) =>
            todo.id === todoId
              ? {
                ...todo,

                completed:
                  !todo.completed,
              }
              : todo
        ),
      })
    )
  );
