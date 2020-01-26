import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITesteConhecimento, TesteConhecimento } from 'app/shared/model/pedagogico/teste-conhecimento.model';
import { TesteConhecimentoService } from './teste-conhecimento.service';
import { IPlanoCurricular } from 'app/shared/model/pedagogico/plano-curricular.model';
import { PlanoCurricularService } from 'app/entities/pedagogico/plano-curricular/plano-curricular.service';
import { ITurma } from 'app/shared/model/pedagogico/turma.model';
import { TurmaService } from 'app/entities/pedagogico/turma/turma.service';
import { IProfessor } from 'app/shared/model/pedagogico/professor.model';
import { ProfessorService } from 'app/entities/pedagogico/professor/professor.service';

type SelectableEntity = IPlanoCurricular | ITurma | IProfessor;

@Component({
  selector: 'rv-teste-conhecimento-update',
  templateUrl: './teste-conhecimento-update.component.html'
})
export class TesteConhecimentoUpdateComponent implements OnInit {
  isSaving = false;

  planocurriculars: IPlanoCurricular[] = [];

  turmas: ITurma[] = [];

  professors: IProfessor[] = [];

  editForm = this.fb.group({
    id: [],
    categoria: [null, [Validators.required]],
    periodoLectivo: [null, [Validators.required]],
    duracao: [null, [Validators.required, Validators.min(0)]],
    data: [],
    curriculoId: [null, Validators.required],
    turmaId: [null, Validators.required],
    professorId: [null, Validators.required]
  });

  constructor(
    protected testeConhecimentoService: TesteConhecimentoService,
    protected planoCurricularService: PlanoCurricularService,
    protected turmaService: TurmaService,
    protected professorService: ProfessorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ testeConhecimento }) => {
      this.updateForm(testeConhecimento);

      this.planoCurricularService
        .query()
        .pipe(
          map((res: HttpResponse<IPlanoCurricular[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IPlanoCurricular[]) => (this.planocurriculars = resBody));

      this.turmaService
        .query()
        .pipe(
          map((res: HttpResponse<ITurma[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ITurma[]) => (this.turmas = resBody));

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

  updateForm(testeConhecimento: ITesteConhecimento): void {
    this.editForm.patchValue({
      id: testeConhecimento.id,
      categoria: testeConhecimento.categoria,
      periodoLectivo: testeConhecimento.periodoLectivo,
      duracao: testeConhecimento.duracao,
      data: testeConhecimento.data != null ? testeConhecimento.data.format(DATE_TIME_FORMAT) : null,
      curriculoId: testeConhecimento.curriculoId,
      turmaId: testeConhecimento.turmaId,
      professorId: testeConhecimento.professorId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const testeConhecimento = this.createFromForm();
    if (testeConhecimento.id !== undefined) {
      this.subscribeToSaveResponse(this.testeConhecimentoService.update(testeConhecimento));
    } else {
      this.subscribeToSaveResponse(this.testeConhecimentoService.create(testeConhecimento));
    }
  }

  private createFromForm(): ITesteConhecimento {
    return {
      ...new TesteConhecimento(),
      id: this.editForm.get(['id'])!.value,
      categoria: this.editForm.get(['categoria'])!.value,
      periodoLectivo: this.editForm.get(['periodoLectivo'])!.value,
      duracao: this.editForm.get(['duracao'])!.value,
      data: this.editForm.get(['data'])!.value != null ? moment(this.editForm.get(['data'])!.value, DATE_TIME_FORMAT) : undefined,
      curriculoId: this.editForm.get(['curriculoId'])!.value,
      turmaId: this.editForm.get(['turmaId'])!.value,
      professorId: this.editForm.get(['professorId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITesteConhecimento>>): void {
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
