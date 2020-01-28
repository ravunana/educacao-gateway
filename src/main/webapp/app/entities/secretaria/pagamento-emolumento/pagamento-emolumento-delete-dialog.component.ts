import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPagamentoEmolumento } from 'app/shared/model/secretaria/pagamento-emolumento.model';
import { PagamentoEmolumentoService } from './pagamento-emolumento.service';

@Component({
  templateUrl: './pagamento-emolumento-delete-dialog.component.html'
})
export class PagamentoEmolumentoDeleteDialogComponent {
  pagamentoEmolumento?: IPagamentoEmolumento;

  constructor(
    protected pagamentoEmolumentoService: PagamentoEmolumentoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pagamentoEmolumentoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('pagamentoEmolumentoListModification');
      this.activeModal.close();
    });
  }
}
