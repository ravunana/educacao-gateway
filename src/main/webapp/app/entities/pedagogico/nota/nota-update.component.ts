import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { INota, Nota } from 'app/shared/model/pedagogico/nota.model';
import { NotaService } from './nota.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ITurma } from 'app/shared/model/pedagogico/turma.model';
import { TurmaService } from 'app/entities/pedagogico/turma/turma.service';
import { IPlanoCurricular } from 'app/shared/model/pedagogico/plano-curricular.model';
import { PlanoCurricularService } from 'app/entities/pedagogico/plano-curricular/plano-curricular.service';
import { IProfessor } from 'app/shared/model/pedagogico/professor.model';
import { ProfessorService } from 'app/entities/pedagogico/professor/professor.service';

type SelectableEntity = ITurma | IPlanoCurricular | IProfessor;

@Component({
  selector: 'rv-nota-update',
  templateUrl: './nota-update.component.html'
})
export class NotaUpdateComponent implements OnInit {
  isSaving = false;

  turmas: ITurma[] = [];

  planocurriculars: IPlanoCurricular[] = [];

  professors: IProfessor[] = [];

  editForm = this.fb.group({
    id: [],
    numeroProcesso: [null, [Validators.required]],
    nomeAluno: [null, [Validators.required]],
    disciplina: [],
    peridoLectivo: [],
    anoLectivo: [],
    faltaJustificada: [],
    faltaInjustificada: [],
    avaliacaoContinuca: [null, [Validators.min(0), Validators.max(20)]],
    primeiraProva: [null, [Validators.min(0), Validators.max(20)]],
    segundaProva: [null, [Validators.min(0), Validators.max(20)]],
    exame: [null, [Validators.min(0), Validators.max(20)]],
    recurso: [null, [Validators.min(0), Validators.max(20)]],
    exameEspecial: [null, [Validators.min(0), Validators.max(20)]],
    prova: [null, [Validators.required]],
    provaContentType: [],
    situacao: [],
    turmaId: [null, Validators.required],
    curriculoId: [null, Validators.required],
    professorId: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected notaService: NotaService,
    protected turmaService: TurmaService,
    protected planoCurricularService: PlanoCurricularService,
    protected professorService: ProfessorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nota }) => {
      this.updateForm(nota);

      this.turmaService
        .query()
        .pipe(
          map((res: HttpResponse<ITurma[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ITurma[]) => (this.turmas = resBody));

      this.planoCurricularService
        .query()
        .pipe(
          map((res: HttpResponse<IPlanoCurricular[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IPlanoCurricular[]) => (this.planocurriculars = resBody));

      this.professorService
        .query()
        .pipe(
          map((res: HttpResponse<IProfessor[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IProfessor[]) => (this.professors = resBody));
    });
  }

  updateForm(nota: INota): void {
    this.editForm.patchValue({
      id: nota.id,
      numeroProcesso: nota.numeroProcesso,
      nomeAluno: nota.nomeAluno,
      disciplina: nota.disciplina,
      peridoLectivo: nota.peridoLectivo,
      anoLectivo: nota.anoLectivo,
      faltaJustificada: nota.faltaJustificada,
      faltaInjustificada: nota.faltaInjustificada,
      avaliacaoContinuca: nota.avaliacaoContinuca,
      primeiraProva: nota.primeiraProva,
      segundaProva: nota.segundaProva,
      exame: nota.exame,
      recurso: nota.recurso,
      exameEspecial: nota.exameEspecial,
      prova: nota.prova,
      provaContentType: nota.provaContentType,
      situacao: nota.situacao,
      turmaId: nota.turmaId,
      curriculoId: nota.curriculoId,
      professorId: nota.professorId
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
    const nota = this.createFromForm();
    if (nota.id !== undefined) {
      this.subscribeToSaveResponse(this.notaService.update(nota));
    } else {
      this.subscribeToSaveResponse(this.notaService.create(nota));
    }
  }

  private createFromForm(): INota {
    return {
      ...new Nota(),
      id: this.editForm.get(['id'])!.value,
      numeroProcesso: this.editForm.get(['numeroProcesso'])!.value,
      nomeAluno: this.editForm.get(['nomeAluno'])!.value,
      disciplina: this.editForm.get(['disciplina'])!.value,
      peridoLectivo: this.editForm.get(['peridoLectivo'])!.value,
      anoLectivo: this.editForm.get(['anoLectivo'])!.value,
      faltaJustificada: this.editForm.get(['faltaJustificada'])!.value,
      faltaInjustificada: this.editForm.get(['faltaInjustificada'])!.value,
      avaliacaoContinuca: this.editForm.get(['avaliacaoContinuca'])!.value,
      primeiraProva: this.editForm.get(['primeiraProva'])!.value,
      segundaProva: this.editForm.get(['segundaProva'])!.value,
      exame: this.editForm.get(['exame'])!.value,
      recurso: this.editForm.get(['recurso'])!.value,
      exameEspecial: this.editForm.get(['exameEspecial'])!.value,
      provaContentType: this.editForm.get(['provaContentType'])!.value,
      prova: this.editForm.get(['prova'])!.value,
      situacao: this.editForm.get(['situacao'])!.value,
      turmaId: this.editForm.get(['turmaId'])!.value,
      curriculoId: this.editForm.get(['curriculoId'])!.value,
      professorId: this.editForm.get(['professorId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INota>>): void {
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
