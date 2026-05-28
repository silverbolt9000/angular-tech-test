import { Injectable } from '@angular/core';

import {
  delay,
  Observable,
  of,
} from 'rxjs';

import { SearchResult } from '../models/search-result.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly users: SearchResult[] = [
    { id: 1, nome: 'João' },
    { id: 2, nome: 'Maria' },
    { id: 3, nome: 'Pedro' },
    { id: 4, nome: 'Ana' },
  ];

  search(
    term: string
  ): Observable<SearchResult[]> {
    const filtered = this.users.filter(
      (user) =>
        user.nome
          .toLowerCase()
          .includes(term.toLowerCase())
    );

    return of(filtered).pipe(delay(1000));
  }
}
