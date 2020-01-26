import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IPlanoAula, PlanoAula } from 'app/shared/model/pedagogico/plano-aula.model';
import { PlanoAulaService } from './plano-aula.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ITurma } from 'app/shared/model/pedagogico/turma.model';
import { TurmaService } from 'app/entities/pedagogico/turma/turma.service';
import { IDosificacao } from 'app/shared/model/pedagogico/dosificacao.model';
import { DosificacaoService } from 'app/entities/pedagogico/dosificacao/dosificacao.service';
import { IProfessor } from 'app/shared/model/pedagogico/professor.model';
import { ProfessorService } from 'app/entities/pedagogico/professor/professor.service';
import { IPlanoCurricular } from 'app/shared/model/pedagogico/plano-curricular.model';
import { PlanoCurricularService } from 'app/entities/pedagogico/plano-curricular/plano-curricular.service';

type SelectableEntity = ITurma | IDosificacao | IProfessor | IPlanoCurricular;

@Component({
  selector: 'rv-plano-aula-update',
  templateUrl: './plano-aula-update.component.html'
})
export class PlanoAulaUpdateComponent implements OnInit {
  isSaving = false;

  turmas: ITurma[] = [];

  dosificacaos: IDosificacao[] = [];

  professors: IProfessor[] = [];

  planocurriculars: IPlanoCurricular[] = [];

  editForm = this.fb.group({
    id: [],
    objectivoGeral: [null, [Validators.required]],
    objectivoEspecifico: [null, [Validators.required]],
    conteudo: [null, [Validators.required]],
    estrategia: [null, [Validators.required]],
    actividades: [null, [Validators.required]],
    tempo: [null, [Validators.required]],
    recursosEnsino: [null, [Validators.required]],
    avaliacao: [null, [Validators.required]],
    observacao: [null, [Validators.required]],
    bibliografia: [null, [Validators.required]],
    perfilEntrada: [null, [Validators.required]],
    perfilSaida: [null, [Validators.required]],
    anexo1: [],
    anexo1ContentType: [],
    turmas: [null, Validators.required],
    dosificacaoId: [],
    professorId: [null, Validators.required],
    curriculoId: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected planoAulaService: PlanoAulaService,
    protected turmaService: TurmaService,
    protected dosificacaoService: DosificacaoService,
    protected professorService: ProfessorService,
    protected planoCurricularService: PlanoCurricularService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planoAula }) => {
      this.updateForm(planoAula);

      this.turmaService
        .query()
        .pipe(
          map((res: HttpResponse<ITurma[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ITurma[]) => (this.turmas = resBody));

      this.dosificacaoService
        .query()
        .pipe(
          map((res: HttpResponse<IDosificacao[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IDosificacao[]) => (this.dosificacaos = resBody));

      this.professorService
        .query()
        .pipe(
          map((res: HttpResponse<IProfessor[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IProfessor[]) => (this.professors = resBody));

      this.planoCurricularService
        .query()
        .pipe(
          map((res: HttpResponse<IPlanoCurricular[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IPlanoCurricular[]) => (this.planocurriculars = resBody));
    });
  }

  updateForm(planoAula: IPlanoAula): void {
    this.editForm.patchValue({
      id: planoAula.id,
      objectivoGeral: planoAula.objectivoGeral,
      objectivoEspecifico: planoAula.objectivoEspecifico,
      conteudo: planoAula.conteudo,
      estrategia: planoAula.estrategia,
      actividades: planoAula.actividades,
      tempo: planoAula.tempo != null ? planoAula.tempo.format(DATE_TIME_FORMAT) : null,
      recursosEnsino: planoAula.recursosEnsino,
      avaliacao: planoAula.avaliacao,
      observacao: planoAula.observacao,
      bibliografia: planoAula.bibliografia,
      perfilEntrada: planoAula.perfilEntrada,
      perfilSaida: planoAula.perfilSaida,
      anexo1: planoAula.anexo1,
      anexo1ContentType: planoAula.anexo1ContentType,
      turmas: planoAula.turmas,
      dosificacaoId: planoAula.dosificacaoId,
      professorId: planoAula.professorId,
      curriculoId: planoAula.curriculoId
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('educacaoApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const planoAula = this.createFromForm();
    if (planoAula.id !== undefined) {
      this.subscribeToSaveResponse(this.planoAulaService.update(planoAula));
    } else {
      this.subscribeToSaveResponse(this.planoAulaService.create(planoAula));
    }
  }

  private createFromForm(): IPlanoAula {
    return {
      ...new PlanoAula(),
      id: this.editForm.get(['id'])!.value,
      objectivoGeral: this.editForm.get(['objectivoGeral'])!.value,
      objectivoEspecifico: this.editForm.get(['objectivoEspecifico'])!.value,
      conteudo: this.editForm.get(['conteudo'])!.value,
      estrategia: this.editForm.get(['estrategia'])!.value,
      actividades: this.editForm.get(['actividades'])!.value,
      tempo: this.editForm.get(['tempo'])!.value != null ? moment(this.editForm.get(['tempo'])!.value, DATE_TIME_FORMAT) : undefined,
      recursosEnsino: this.editForm.get(['recursosEnsino'])!.value,
      avaliacao: this.editForm.get(['avaliacao'])!.value,
      observacao: this.editForm.get(['observacao'])!.value,
      bibliografia: this.editForm.get(['bibliografia'])!.value,
      perfilEntrada: this.editForm.get(['perfilEntrada'])!.value,
      perfilSaida: this.editForm.get(['perfilSaida'])!.value,
      anexo1ContentType: this.editForm.get(['anexo1ContentType'])!.value,
      anexo1: this.editForm.get(['anexo1'])!.value,
      turmas: this.editForm.get(['turmas'])!.value,
      dosificacaoId: this.editForm.get(['dosificacaoId'])!.value,
      professorId: this.editForm.get(['professorId'])!.value,
      curriculoId: this.editForm.get(['curriculoId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlanoAula>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: ITurma[], option: ITurma): ITurma {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
