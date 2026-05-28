import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-ts-refactoring',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
  ],

  templateUrl:
    './refactor.html',

  styleUrls: [
    './refactor.scss',
  ],
})
export class TsRefactoringComponent {
  readonly problemas = [
    'Uso excessivo de any',
    'Duplicação de lógica',
    'Uso de for imperativo',
    'Ausência de tipagem forte',
    'Comparação usando ==',
    'Possível erro de undefined',
    'Baixa reutilização',
  ];

  readonly melhorias = [
    'Tipagem forte com interfaces',
    'Uso de readonly',
    'Método reutilizável',
    'find() ao invés de for',
    'Template strings',
    'Optional chaining',
    'Código mais legível',
  ];

  readonly codigoOriginal = `
class Produto {
  id: any;
  descricao: any;
  quantidadeEstoque: any;

  constructor(
    id: any,
    descricao: any,
    quantidadeEstoque: any
  ) {
    this.id = id;
    this.descricao = descricao;
    this.quantidadeEstoque =
      quantidadeEstoque;
  }
}

class Verdureira {

  produtos: any;

  constructor() {
    this.produtos = [
      new Produto(1, 'Maçã', 20),
      new Produto(2, 'Laranja', 0),
      new Produto(3, 'Limão', 20),
    ];
  }

  getDescricaoProduto(
    produtoId: any
  ) {
    let produto;

    for (
      let index = 0;
      index < this.produtos.length;
      index++
    ) {
      if (
        this.produtos[index].id ==
        produtoId
      ) {
        produto =
          this.produtos[index];
      }
    }

    return (
      produto.id +
      ' - ' +
      produto.descricao +
      ' (' +
      produto.quantidadeEstoque +
      'x)'
    );
  }

  hasEstoqueProduto(
    produtoId: any
  ) {
    let produto;

    for (
      let index = 0;
      index < this.produtos.length;
      index++
    ) {
      if (
        this.produtos[index].id ==
        produtoId
      ) {
        produto =
          this.produtos[index];
      }
    }

    if (
      produto.quantidadeEstoque > 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}
`;

  readonly codigoRefatorado = `
interface Produto {
  readonly id: number;
  readonly descricao: string;
  readonly quantidadeEstoque: number;
}

class Verdureira {

  private readonly produtos:
    Produto[] = [
      {
        id: 1,
        descricao: 'Maçã',
        quantidadeEstoque: 20,
      },

      {
        id: 2,
        descricao: 'Laranja',
        quantidadeEstoque: 0,
      },

      {
        id: 3,
        descricao: 'Limão',
        quantidadeEstoque: 20,
      },
    ];

  private buscarProduto(
    produtoId: number
  ): Produto | undefined {
    return this.produtos.find(
      (produto) =>
        produto.id === produtoId
    );
  }

  getDescricaoProduto(
    produtoId: number
  ): string {
    const produto =
      this.buscarProduto(
        produtoId
      );

    if (!produto) {
      return 'Produto não encontrado';
    }

    return \`\${produto.id} -
      \${produto.descricao}
      (\${produto.quantidadeEstoque}x)\`;
  }

  hasEstoqueProduto(
    produtoId: number
  ): boolean {
    const produto =
      this.buscarProduto(
        produtoId
      );

    return (
      produto
        ?.quantidadeEstoque > 0
    );
  }
}
`;
}
