import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQuestaoTeste } from 'app/shared/model/pedagogico/questao-teste.model';
import { QuestaoTesteService } from './questao-teste.service';

@Component({
  templateUrl: './questao-teste-delete-dialog.component.html'
})
export class QuestaoTesteDeleteDialogComponent {
  questaoTeste?: IQuestaoTeste;

  constructor(
    protected questaoTesteService: QuestaoTesteService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.questaoTesteService.delete(id).subscribe(() => {
      this.eventManager.broadcast('questaoTesteListModification');
      this.activeModal.close();
    });
  }
}
