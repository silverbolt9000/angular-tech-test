import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injectable,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Observable, Subscription, delay, of } from 'rxjs';

@Injectable()
class PessoaService {
  buscarPorId(
    id: number
  ): Observable<{
    id: number;
    nome: string;
  }> {
    return of({
      id,
      nome: 'João',
    }).pipe(delay(500));
  }
}

@Component({
  selector:
    'app-change-detection',
  standalone: true,
  providers: [PessoaService],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl:
    './change-detection.html',
  styleUrls: [
    './change-detection.scss',
  ],
  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class ChangeDetectionComponent
  implements OnInit, OnDestroy {
  texto = '';

  contador = 0;

  subscription?:
    | Subscription
    | undefined;

  intervalId?: number;

  constructor(
    private readonly pessoaService: PessoaService,

    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subscription =
      this.pessoaService
        .buscarPorId(1)
        .subscribe((pessoa) => {
          this.texto = `Nome: ${pessoa.nome}`;

          this.cdr.markForCheck();
        });

    this.intervalId = window.setInterval(
      () => {
        this.contador++;

        this.cdr.markForCheck();
      },
      1000
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();

    clearInterval(this.intervalId);
  }
}
