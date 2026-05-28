import {
  Component,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

interface PaginaParams {
  pagina: number;
  tamanho: number;
}

interface Pagina<T> {
  itens: T[];
  total: number;
}

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

@Component({
  selector:
    'app-generics-demo',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
  ],

  templateUrl:
    './generics.html',

  styleUrls: [
    './generics.scss',
  ],
})
export class GenericsDemoComponent {
  readonly usuarios =
    signal<Usuario[]>(
      Array.from(
        { length: 25 },
        (_, index) => ({
          id: index + 1,
          nome: `Usuário ${index + 1
            }`,
          email: `usuario${index + 1
            }@email.com`,
        })
      )
    );

  readonly filtro =
    signal('');

  readonly paginaAtual =
    signal(1);

  readonly tamanhoPagina =
    signal(5);

  readonly resultado =
    computed(() =>
      this.filtrarEPaginar<Usuario>(
        this.usuarios(),
        (usuario) =>
          usuario.nome
            .toLowerCase()
            .includes(
              this.filtro()
                .toLowerCase()
            ),
        {
          pagina:
            this.paginaAtual(),
          tamanho:
            this.tamanhoPagina(),
        }
      )
    );

  filtrarEPaginar<T>(
    data: T[],

    filterFn: (
      item: T
    ) => boolean,

    params: PaginaParams
  ): Pagina<T> {
    const filtrados =
      data.filter(filterFn);

    const inicio =
      (params.pagina - 1) *
      params.tamanho;

    const fim =
      inicio + params.tamanho;

    return {
      itens:
        filtrados.slice(
          inicio,
          fim
        ),

      total:
        filtrados.length,
    };
  }

  proximaPagina(): void {
    const totalPaginas =
      Math.ceil(
        this.resultado().total /
        this.tamanhoPagina()
      );

    if (
      this.paginaAtual() <
      totalPaginas
    ) {
      this.paginaAtual.update(
        (pagina) =>
          pagina + 1
      );
    }
  }

  paginaAnterior(): void {
    if (
      this.paginaAtual() > 1
    ) {
      this.paginaAtual.update(
        (pagina) =>
          pagina - 1
      );
    }
  }
}
