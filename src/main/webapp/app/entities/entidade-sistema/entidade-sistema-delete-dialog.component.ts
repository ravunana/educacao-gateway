import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEntidadeSistema } from 'app/shared/model/entidade-sistema.model';
import { EntidadeSistemaService } from './entidade-sistema.service';

@Component({
  templateUrl: './entidade-sistema-delete-dialog.component.html'
})
export class EntidadeSistemaDeleteDialogComponent {
  entidadeSistema?: IEntidadeSistema;

  constructor(
    protected entidadeSistemaService: EntidadeSistemaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.entidadeSistemaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('entidadeSistemaListModification');
      this.activeModal.close();
    });
  }
}
