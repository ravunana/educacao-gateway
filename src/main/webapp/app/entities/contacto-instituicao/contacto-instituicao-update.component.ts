import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IContactoInstituicao, ContactoInstituicao } from 'app/shared/model/contacto-instituicao.model';
import { ContactoInstituicaoService } from './contacto-instituicao.service';
import { IInstituicaoEnsino } from 'app/shared/model/instituicao-ensino.model';
import { InstituicaoEnsinoService } from 'app/entities/instituicao-ensino/instituicao-ensino.service';

@Component({
  selector: 'rv-contacto-instituicao-update',
  templateUrl: './contacto-instituicao-update.component.html'
})
export class ContactoInstituicaoUpdateComponent implements OnInit {
  isSaving = false;

  instituicaoensinos: IInstituicaoEnsino[] = [];

  editForm = this.fb.group({
    id: [],
    tipoContacto: [null, [Validators.required]],
    descricao: [null, [Validators.required]],
    contacto: [null, [Validators.required]],
    mostrarDocumento: [],
    instituicaoEnsinoId: [null, Validators.required]
  });

  constructor(
    protected contactoInstituicaoService: ContactoInstituicaoService,
    protected instituicaoEnsinoService: InstituicaoEnsinoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contactoInstituicao }) => {
      this.updateForm(contactoInstituicao);

      this.instituicaoEnsinoService
        .query()
        .pipe(
          map((res: HttpResponse<IInstituicaoEnsino[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IInstituicaoEnsino[]) => (this.instituicaoensinos = resBody));
    });
  }

  updateForm(contactoInstituicao: IContactoInstituicao): void {
    this.editForm.patchValue({
      id: contactoInstituicao.id,
      tipoContacto: contactoInstituicao.tipoContacto,
      descricao: contactoInstituicao.descricao,
      contacto: contactoInstituicao.contacto,
      mostrarDocumento: contactoInstituicao.mostrarDocumento,
      instituicaoEnsinoId: contactoInstituicao.instituicaoEnsinoId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contactoInstituicao = this.createFromForm();
    if (contactoInstituicao.id !== undefined) {
      this.subscribeToSaveResponse(this.contactoInstituicaoService.update(contactoInstituicao));
    } else {
      this.subscribeToSaveResponse(this.contactoInstituicaoService.create(contactoInstituicao));
    }
  }

  private createFromForm(): IContactoInstituicao {
    return {
      ...new ContactoInstituicao(),
      id: this.editForm.get(['id'])!.value,
      tipoContacto: this.editForm.get(['tipoContacto'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      contacto: this.editForm.get(['contacto'])!.value,
      mostrarDocumento: this.editForm.get(['mostrarDocumento'])!.value,
      instituicaoEnsinoId: this.editForm.get(['instituicaoEnsinoId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContactoInstituicao>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IInstituicaoEnsino): any {
    return item.id;
  }
}
