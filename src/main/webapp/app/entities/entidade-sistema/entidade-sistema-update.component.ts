import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEntidadeSistema, EntidadeSistema } from 'app/shared/model/entidade-sistema.model';
import { EntidadeSistemaService } from './entidade-sistema.service';

@Component({
  selector: 'rv-entidade-sistema-update',
  templateUrl: './entidade-sistema-update.component.html'
})
export class EntidadeSistemaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]]
  });

  constructor(
    protected entidadeSistemaService: EntidadeSistemaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entidadeSistema }) => {
      this.updateForm(entidadeSistema);
    });
  }

  updateForm(entidadeSistema: IEntidadeSistema): void {
    this.editForm.patchValue({
      id: entidadeSistema.id,
      nome: entidadeSistema.nome
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entidadeSistema = this.createFromForm();
    if (entidadeSistema.id !== undefined) {
      this.subscribeToSaveResponse(this.entidadeSistemaService.update(entidadeSistema));
    } else {
      this.subscribeToSaveResponse(this.entidadeSistemaService.create(entidadeSistema));
    }
  }

  private createFromForm(): IEntidadeSistema {
    return {
      ...new EntidadeSistema(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntidadeSistema>>): void {
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
}
