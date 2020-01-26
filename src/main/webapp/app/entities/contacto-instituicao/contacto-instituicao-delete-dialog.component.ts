import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContactoInstituicao } from 'app/shared/model/contacto-instituicao.model';
import { ContactoInstituicaoService } from './contacto-instituicao.service';

@Component({
  templateUrl: './contacto-instituicao-delete-dialog.component.html'
})
export class ContactoInstituicaoDeleteDialogComponent {
  contactoInstituicao?: IContactoInstituicao;

  constructor(
    protected contactoInstituicaoService: ContactoInstituicaoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contactoInstituicaoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('contactoInstituicaoListModification');
      this.activeModal.close();
    });
  }
}
