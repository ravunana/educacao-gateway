import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IQuestaoTeste, QuestaoTeste } from 'app/shared/model/pedagogico/questao-teste.model';
import { QuestaoTesteService } from './questao-teste.service';
import { ITesteConhecimento } from 'app/shared/model/pedagogico/teste-conhecimento.model';
import { TesteConhecimentoService } from 'app/entities/pedagogico/teste-conhecimento/teste-conhecimento.service';

@Component({
  selector: 'rv-questao-teste-update',
  templateUrl: './questao-teste-update.component.html'
})
export class QuestaoTesteUpdateComponent implements OnInit {
  isSaving = false;

  testeconhecimentos: ITesteConhecimento[] = [];

  editForm = this.fb.group({
    id: [],
    grupo: [null, [Validators.required]],
    numero: [null, [Validators.required]],
    argumento: [],
    questao: [null, [Validators.required]],
    testeId: [null, Validators.required]
  });

  constructor(
    protected questaoTesteService: QuestaoTesteService,
    protected testeConhecimentoService: TesteConhecimentoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ questaoTeste }) => {
      this.updateForm(questaoTeste);

      this.testeConhecimentoService
        .query()
        .pipe(
          map((res: HttpResponse<ITesteConhecimento[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ITesteConhecimento[]) => (this.testeconhecimentos = resBody));
    });
  }

  updateForm(questaoTeste: IQuestaoTeste): void {
    this.editForm.patchValue({
      id: questaoTeste.id,
      grupo: questaoTeste.grupo,
      numero: questaoTeste.numero,
      argumento: questaoTeste.argumento,
      questao: questaoTeste.questao,
      testeId: questaoTeste.testeId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const questaoTeste = this.createFromForm();
    if (questaoTeste.id !== undefined) {
      this.subscribeToSaveResponse(this.questaoTesteService.update(questaoTeste));
    } else {
      this.subscribeToSaveResponse(this.questaoTesteService.create(questaoTeste));
    }
  }

  private createFromForm(): IQuestaoTeste {
    return {
      ...new QuestaoTeste(),
      id: this.editForm.get(['id'])!.value,
      grupo: this.editForm.get(['grupo'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      argumento: this.editForm.get(['argumento'])!.value,
      questao: this.editForm.get(['questao'])!.value,
      testeId: this.editForm.get(['testeId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestaoTeste>>): void {
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

  trackById(index: number, item: ITesteConhecimento): any {
    return item.id;
  }
}
