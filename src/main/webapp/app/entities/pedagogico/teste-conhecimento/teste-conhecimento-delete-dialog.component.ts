import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITesteConhecimento } from 'app/shared/model/pedagogico/teste-conhecimento.model';
import { TesteConhecimentoService } from './teste-conhecimento.service';

@Component({
  templateUrl: './teste-conhecimento-delete-dialog.component.html'
})
export class TesteConhecimentoDeleteDialogComponent {
  testeConhecimento?: ITesteConhecimento;

  constructor(
    protected testeConhecimentoService: TesteConhecimentoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.testeConhecimentoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('testeConhecimentoListModification');
      this.activeModal.close();
    });
  }
}
