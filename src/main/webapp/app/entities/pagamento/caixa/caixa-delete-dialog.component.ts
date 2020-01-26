import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICaixa } from 'app/shared/model/pagamento/caixa.model';
import { CaixaService } from './caixa.service';

@Component({
  templateUrl: './caixa-delete-dialog.component.html'
})
export class CaixaDeleteDialogComponent {
  caixa?: ICaixa;

  constructor(protected caixaService: CaixaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.caixaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('caixaListModification');
      this.activeModal.close();
    });
  }
}
