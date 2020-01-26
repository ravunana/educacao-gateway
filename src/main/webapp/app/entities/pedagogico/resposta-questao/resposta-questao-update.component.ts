import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRespostaQuestao, RespostaQuestao } from 'app/shared/model/pedagogico/resposta-questao.model';
import { RespostaQuestaoService } from './resposta-questao.service';
import { IQuestaoTeste } from 'app/shared/model/pedagogico/questao-teste.model';
import { QuestaoTesteService } from 'app/entities/pedagogico/questao-teste/questao-teste.service';

@Component({
  selector: 'rv-resposta-questao-update',
  templateUrl: './resposta-questao-update.component.html'
})
export class RespostaQuestaoUpdateComponent implements OnInit {
  isSaving = false;

  questaos: IQuestaoTeste[] = [];

  editForm = this.fb.group({
    id: [],
    resposta: [],
    questaoId: [null, Validators.required]
  });

  constructor(
    protected respostaQuestaoService: RespostaQuestaoService,
    protected questaoTesteService: QuestaoTesteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ respostaQuestao }) => {
      this.updateForm(respostaQuestao);

      this.questaoTesteService
        .query({ filter: 'respostaquestao-is-null' })
        .pipe(
          map((res: HttpResponse<IQuestaoTeste[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IQuestaoTeste[]) => {
          if (!respostaQuestao.questaoId) {
            this.questaos = resBody;
          } else {
            this.questaoTesteService
              .find(respostaQuestao.questaoId)
              .pipe(
                map((subRes: HttpResponse<IQuestaoTeste>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IQuestaoTeste[]) => {
                this.questaos = concatRes;
              });
          }
        });
    });
  }

  updateForm(respostaQuestao: IRespostaQuestao): void {
    this.editForm.patchValue({
      id: respostaQuestao.id,
      resposta: respostaQuestao.resposta,
      questaoId: respostaQuestao.questaoId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const respostaQuestao = this.createFromForm();
    if (respostaQuestao.id !== undefined) {
      this.subscribeToSaveResponse(this.respostaQuestaoService.update(respostaQuestao));
    } else {
      this.subscribeToSaveResponse(this.respostaQuestaoService.create(respostaQuestao));
    }
  }

  private createFromForm(): IRespostaQuestao {
    return {
      ...new RespostaQuestao(),
      id: this.editForm.get(['id'])!.value,
      resposta: this.editForm.get(['resposta'])!.value,
      questaoId: this.editForm.get(['questaoId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRespostaQuestao>>): void {
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

  trackById(index: number, item: IQuestaoTeste): any {
    return item.id;
  }
}
