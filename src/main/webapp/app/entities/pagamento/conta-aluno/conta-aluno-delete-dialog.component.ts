import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContaAluno } from 'app/shared/model/pagamento/conta-aluno.model';
import { ContaAlunoService } from './conta-aluno.service';

@Component({
  templateUrl: './conta-aluno-delete-dialog.component.html'
})
export class ContaAlunoDeleteDialogComponent {
  contaAluno?: IContaAluno;

  constructor(
    protected contaAlunoService: ContaAlunoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contaAlunoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('contaAlunoListModification');
      this.activeModal.close();
    });
  }
}
