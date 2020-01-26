import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IContaAluno, ContaAluno } from 'app/shared/model/pagamento/conta-aluno.model';
import { ContaAlunoService } from './conta-aluno.service';

@Component({
  selector: 'rv-conta-aluno-update',
  templateUrl: './conta-aluno-update.component.html'
})
export class ContaAlunoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    debito: [null, [Validators.required, Validators.min(0)]],
    credito: [null, [Validators.required, Validators.min(0)]],
    numeroProcesso: [null, [Validators.required]]
  });

  constructor(protected contaAlunoService: ContaAlunoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contaAluno }) => {
      this.updateForm(contaAluno);
    });
  }

  updateForm(contaAluno: IContaAluno): void {
    this.editForm.patchValue({
      id: contaAluno.id,
      debito: contaAluno.debito,
      credito: contaAluno.credito,
      numeroProcesso: contaAluno.numeroProcesso
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contaAluno = this.createFromForm();
    if (contaAluno.id !== undefined) {
      this.subscribeToSaveResponse(this.contaAlunoService.update(contaAluno));
    } else {
      this.subscribeToSaveResponse(this.contaAlunoService.create(contaAluno));
    }
  }

  private createFromForm(): IContaAluno {
    return {
      ...new ContaAluno(),
      id: this.editForm.get(['id'])!.value,
      debito: this.editForm.get(['debito'])!.value,
      credito: this.editForm.get(['credito'])!.value,
      numeroProcesso: this.editForm.get(['numeroProcesso'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContaAluno>>): void {
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
