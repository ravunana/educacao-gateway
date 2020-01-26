import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDosificacao } from 'app/shared/model/pedagogico/dosificacao.model';
import { DosificacaoService } from './dosificacao.service';

@Component({
  templateUrl: './dosificacao-delete-dialog.component.html'
})
export class DosificacaoDeleteDialogComponent {
  dosificacao?: IDosificacao;

  constructor(
    protected dosificacaoService: DosificacaoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dosificacaoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('dosificacaoListModification');
      this.activeModal.close();
    });
  }
}
