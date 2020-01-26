import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEfeitoPagamento } from 'app/shared/model/pagamento/efeito-pagamento.model';

@Component({
  selector: 'rv-efeito-pagamento-detail',
  templateUrl: './efeito-pagamento-detail.component.html'
})
export class EfeitoPagamentoDetailComponent implements OnInit {
  efeitoPagamento: IEfeitoPagamento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ efeitoPagamento }) => {
      this.efeitoPagamento = efeitoPagamento;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
