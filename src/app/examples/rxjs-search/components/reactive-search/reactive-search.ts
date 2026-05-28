import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';

import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  Observable,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchService } from '../../services/search.service';
import { SearchResult } from '../../models/search-result.model';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatCardModule } from '@angular/material/card';

import { MatListModule } from '@angular/material/list';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reactive-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl:
    './reactive-search.html',
  styleUrls: [
    './reactive-search.scss',
  ],
  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class ReactiveSearchComponent {
  private readonly searchService =
    inject(SearchService);

  private readonly destroyRef =
    inject(DestroyRef);

  readonly searchControl =
    new FormControl('', {
      nonNullable: true,
    });

  readonly loading$ =
    new BehaviorSubject(false);

  readonly results$: Observable<
    SearchResult[]
  > = this.searchControl.valueChanges.pipe(
    startWith(''),

    debounceTime(500),

    distinctUntilChanged(),

    tap(() => this.loading$.next(true)),

    switchMap((term) =>
      this.searchService.search(term).pipe(
        catchError(() => of([])),

        finalize(() =>
          this.loading$.next(false)
        )
      )
    ),

    takeUntilDestroyed(this.destroyRef)
  );
}
