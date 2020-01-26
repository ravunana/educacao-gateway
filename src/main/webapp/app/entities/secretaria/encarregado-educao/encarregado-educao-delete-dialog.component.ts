import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEncarregadoEducao } from 'app/shared/model/secretaria/encarregado-educao.model';
import { EncarregadoEducaoService } from './encarregado-educao.service';

@Component({
  templateUrl: './encarregado-educao-delete-dialog.component.html'
})
export class EncarregadoEducaoDeleteDialogComponent {
  encarregadoEducao?: IEncarregadoEducao;

  constructor(
    protected encarregadoEducaoService: EncarregadoEducaoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.encarregadoEducaoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('encarregadoEducaoListModification');
      this.activeModal.close();
    });
  }
}
