import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IPlanoActividade, PlanoActividade } from 'app/shared/model/pedagogico/plano-actividade.model';
import { PlanoActividadeService } from './plano-actividade.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ICurso } from 'app/shared/model/pedagogico/curso.model';
import { CursoService } from 'app/entities/pedagogico/curso/curso.service';
import { ITurma } from 'app/shared/model/pedagogico/turma.model';
import { TurmaService } from 'app/entities/pedagogico/turma/turma.service';
import { LookupService } from 'app/entities/lookup/lookup.service';

type SelectableEntity = ICurso | ITurma;

@Component({
  selector: 'rv-plano-actividade-update',
  templateUrl: './plano-actividade-update.component.html'
})
export class PlanoActividadeUpdateComponent implements OnInit {
  isSaving = false;

  statusActividade: any;
  periodosLectivo: any;
  turnos: any;
  classes: any;

  cursos: ICurso[] = [];

  turmas: ITurma[] = [];
  deDp: any;
  ateDp: any;

  editForm = this.fb.group({
    id: [],
    numeroActividade: [null, [Validators.min(1)]],
    atividade: [null, [Validators.required]],
    objectivos: [null, [Validators.required]],
    de: [null, [Validators.required]],
    ate: [null, [Validators.required]],
    responsavel: [null, [Validators.required]],
    local: [],
    observacao: [],
    participantes: [],
    coResponsavel: [],
    anoLectivo: [null, [Validators.required]],
    statusActividade: [],
    periodoLectivo: [],
    turno: [],
    classe: [],
    cursoId: [],
    turmaId: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected planoActividadeService: PlanoActividadeService,
    protected cursoService: CursoService,
    protected turmaService: TurmaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private lookupService: LookupService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planoActividade }) => {
      this.updateForm(planoActividade);

      this.cursoService
        .query()
        .pipe(
          map((res: HttpResponse<ICurso[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICurso[]) => (this.cursos = resBody));

      this.turmaService
        .query()
        .pipe(
          map((res: HttpResponse<ITurma[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ITurma[]) => (this.turmas = resBody));
    });
    this.lookupService.query({ 'entidadeId.equals': 14 }).subscribe(data => {
      this.turnos = data.body;
    });
    this.lookupService.query({ 'entidadeId.equals': 13 }).subscribe(data => {
      this.classes = data.body;
    });
    this.lookupService.query({ 'entidadeId.equals': 11 }).subscribe(data => {
      this.periodosLectivo = data.body;
    });
    this.lookupService.query({ 'entidadeId.equals': 21 }).subscribe(data => {
      this.statusActividade = data.body;
    });
  }

  updateForm(planoActividade: IPlanoActividade): void {
    this.editForm.patchValue({
      id: planoActividade.id,
      numeroActividade: planoActividade.numeroActividade,
      atividade: planoActividade.atividade,
      objectivos: planoActividade.objectivos,
      de: planoActividade.de,
      ate: planoActividade.ate,
      responsavel: planoActividade.responsavel,
      local: planoActividade.local,
      observacao: planoActividade.observacao,
      participantes: planoActividade.participantes,
      coResponsavel: planoActividade.coResponsavel,
      anoLectivo: planoActividade.anoLectivo,
      statusActividade: planoActividade.statusActividade,
      periodoLectivo: planoActividade.periodoLectivo,
      turno: planoActividade.turno,
      classe: planoActividade.classe,
      cursoId: planoActividade.cursoId,
      turmaId: planoActividade.turmaId
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
    const planoActividade = this.createFromForm();
    if (planoActividade.id !== undefined) {
      this.subscribeToSaveResponse(this.planoActividadeService.update(planoActividade));
    } else {
      this.subscribeToSaveResponse(this.planoActividadeService.create(planoActividade));
    }
  }

  private createFromForm(): IPlanoActividade {
    return {
      ...new PlanoActividade(),
      id: this.editForm.get(['id'])!.value,
      numeroActividade: this.editForm.get(['numeroActividade'])!.value,
      atividade: this.editForm.get(['atividade'])!.value,
      objectivos: this.editForm.get(['objectivos'])!.value,
      de: this.editForm.get(['de'])!.value,
      ate: this.editForm.get(['ate'])!.value,
      responsavel: this.editForm.get(['responsavel'])!.value,
      local: this.editForm.get(['local'])!.value,
      observacao: this.editForm.get(['observacao'])!.value,
      participantes: this.editForm.get(['participantes'])!.value,
      coResponsavel: this.editForm.get(['coResponsavel'])!.value,
      anoLectivo: this.editForm.get(['anoLectivo'])!.value,
      statusActividade: this.editForm.get(['statusActividade'])!.value,
      periodoLectivo: this.editForm.get(['periodoLectivo'])!.value,
      turno: this.editForm.get(['turno'])!.value,
      classe: this.editForm.get(['classe'])!.value,
      cursoId: this.editForm.get(['cursoId'])!.value,
      turmaId: this.editForm.get(['turmaId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlanoActividade>>): void {
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
}
