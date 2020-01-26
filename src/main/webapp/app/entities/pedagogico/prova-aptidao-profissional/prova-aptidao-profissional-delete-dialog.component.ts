import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProvaAptidaoProfissional } from 'app/shared/model/pedagogico/prova-aptidao-profissional.model';
import { ProvaAptidaoProfissionalService } from './prova-aptidao-profissional.service';

@Component({
  templateUrl: './prova-aptidao-profissional-delete-dialog.component.html'
})
export class ProvaAptidaoProfissionalDeleteDialogComponent {
  provaAptidaoProfissional?: IProvaAptidaoProfissional;

  constructor(
    protected provaAptidaoProfissionalService: ProvaAptidaoProfissionalService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.provaAptidaoProfissionalService.delete(id).subscribe(() => {
      this.eventManager.broadcast('provaAptidaoProfissionalListModification');
      this.activeModal.close();
    });
  }
}
