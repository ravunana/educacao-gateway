import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDeposito } from 'app/shared/model/pagamento/deposito.model';

@Component({
  selector: 'rv-deposito-detail',
  templateUrl: './deposito-detail.component.html'
})
export class DepositoDetailComponent implements OnInit {
  deposito: IDeposito | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deposito }) => {
      this.deposito = deposito;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
