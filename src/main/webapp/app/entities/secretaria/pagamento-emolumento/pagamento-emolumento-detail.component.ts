import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPagamentoEmolumento } from 'app/shared/model/secretaria/pagamento-emolumento.model';

@Component({
  selector: 'rv-pagamento-emolumento-detail',
  templateUrl: './pagamento-emolumento-detail.component.html'
})
export class PagamentoEmolumentoDetailComponent implements OnInit {
  pagamentoEmolumento: IPagamentoEmolumento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pagamentoEmolumento }) => {
      this.pagamentoEmolumento = pagamentoEmolumento;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
