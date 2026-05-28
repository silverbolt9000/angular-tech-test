import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as TodoActions from '../../store/todo.actions';
import * as TodoSelectors from '../../store/todo.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-ngrx-todo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
  templateUrl:
    './ngrx-todo.html',
  styleUrls: [
    './ngrx-todo.scss',
  ],
  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class NgrxTodoComponent implements OnInit {
  private readonly store =
    inject<Store>(Store);

  readonly todos$: Observable<Todo[]> =
    this.store.select(
      TodoSelectors.selectAllTodos
    );

  readonly pendingTodos$: Observable<Todo[]> =
    this.store.select(
      TodoSelectors.selectPendingTodos
    );

  readonly loading$: Observable<boolean> =
    this.store.select(
      TodoSelectors.selectLoading
    );

  readonly completedTodos$: Observable<Todo[]> =
    this.store.select(
      TodoSelectors.selectCompletedTodos
    );

  filter: 'all' | 'pending' | 'completed' =
    'all';

  ngOnInit(): void {
    this.store.dispatch(
      TodoActions.loadTodos()
    );
  }

  setFilter(
    filter:
      | 'all'
      | 'pending'
      | 'completed'
  ): void {
    this.filter = filter;
  }

  isVisible(todo: Todo): boolean {
    if (this.filter === 'pending') {
      return !todo.completed;
    }
    if (
      this.filter === 'completed'
    ) {
      return todo.completed;
    }
    return true;
  }


  toggleTodo(
    todoId: number
  ): void {
    this.store.dispatch(
      TodoActions.toggleTodoComplete(
        {
          todoId,
        }
      )
    );
  }
}
