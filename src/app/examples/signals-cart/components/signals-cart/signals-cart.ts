import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-signals-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './signals-cart.html',
  styleUrls: ['./signals-cart.scss'],
  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class SignalsCartComponent {
  readonly totalChanged =
    output<number>();

  readonly items = signal<CartItem[]>([
    {
      id: 1,
      nome: 'Notebook',
      preco: 4500,
      quantidade: 1,
    },
    {
      id: 2,
      nome: 'Mouse Gamer',
      preco: 250,
      quantidade: 2,
    },
  ]);

  readonly total = computed(() =>
    this.items().reduce(
      (acc, item) =>
        acc +
        item.preco *
        item.quantidade,
      0
    )
  );

  constructor() {
    effect(() => {
      this.totalChanged.emit(
        this.total()
      );
    });
  }

  addItem(): void {
    const novoItem: CartItem = {
      id: Date.now(),
      nome: 'Teclado Mecânico',
      preco: 500,
      quantidade: 1,
    };

    this.items.update((items) => [
      ...items,
      novoItem,
    ]);
  }

  removeItem(id: number): void {
    this.items.update((items) =>
      items.filter(
        (item) => item.id !== id
      )
    );
  }
}
