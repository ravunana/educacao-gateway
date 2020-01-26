import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRespostaQuestao } from 'app/shared/model/pedagogico/resposta-questao.model';
import { RespostaQuestaoService } from './resposta-questao.service';

@Component({
  templateUrl: './resposta-questao-delete-dialog.component.html'
})
export class RespostaQuestaoDeleteDialogComponent {
  respostaQuestao?: IRespostaQuestao;

  constructor(
    protected respostaQuestaoService: RespostaQuestaoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.respostaQuestaoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('respostaQuestaoListModification');
      this.activeModal.close();
    });
  }
}
