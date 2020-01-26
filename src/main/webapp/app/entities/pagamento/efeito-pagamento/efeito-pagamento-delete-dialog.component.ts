import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEfeitoPagamento } from 'app/shared/model/pagamento/efeito-pagamento.model';
import { EfeitoPagamentoService } from './efeito-pagamento.service';

@Component({
  templateUrl: './efeito-pagamento-delete-dialog.component.html'
})
export class EfeitoPagamentoDeleteDialogComponent {
  efeitoPagamento?: IEfeitoPagamento;

  constructor(
    protected efeitoPagamentoService: EfeitoPagamentoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.efeitoPagamentoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('efeitoPagamentoListModification');
      this.activeModal.close();
    });
  }
}
