import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICaixa, Caixa } from 'app/shared/model/pagamento/caixa.model';
import { CaixaService } from './caixa.service';

@Component({
  selector: 'rv-caixa-update',
  templateUrl: './caixa-update.component.html'
})
export class CaixaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    descricao: [null, [Validators.required]],
    proprietario: [null, [Validators.required]],
    numeroConta: [null, [Validators.required]],
    iban: [null, []],
    ativo: [null, [Validators.required]]
  });

  constructor(protected caixaService: CaixaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ caixa }) => {
      this.updateForm(caixa);
    });
  }

  updateForm(caixa: ICaixa): void {
    this.editForm.patchValue({
      id: caixa.id,
      descricao: caixa.descricao,
      proprietario: caixa.proprietario,
      numeroConta: caixa.numeroConta,
      iban: caixa.iban,
      ativo: caixa.ativo
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const caixa = this.createFromForm();
    if (caixa.id !== undefined) {
      this.subscribeToSaveResponse(this.caixaService.update(caixa));
    } else {
      this.subscribeToSaveResponse(this.caixaService.create(caixa));
    }
  }

  private createFromForm(): ICaixa {
    return {
      ...new Caixa(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      proprietario: this.editForm.get(['proprietario'])!.value,
      numeroConta: this.editForm.get(['numeroConta'])!.value,
      iban: this.editForm.get(['iban'])!.value,
      ativo: this.editForm.get(['ativo'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICaixa>>): void {
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
