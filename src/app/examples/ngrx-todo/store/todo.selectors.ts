import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import { TodoState } from './todo.state';

import { todoFeatureKey } from './todo.reducer';

export const selectTodoState =
  createFeatureSelector<TodoState>(
    todoFeatureKey
  );

export const selectAllTodos =
  createSelector(
    selectTodoState,
    (state) => state.todos
  );

export const selectPendingTodos =
  createSelector(
    selectAllTodos,
    (todos) =>
      todos.filter(
        (todo) =>
          !todo.completed
      )
  );

export const selectLoading =
  createSelector(
    selectTodoState,
    (state) => state.loading
  );

export const selectError =
  createSelector(
    selectTodoState,
    (state) => state.error
  );

export const selectCompletedTodos =
  createSelector(
    selectAllTodos,
    (todos) =>
      todos.filter(
        (todo) => todo.completed
      )
  );
