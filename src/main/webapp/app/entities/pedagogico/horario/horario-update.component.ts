import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IHorario, Horario } from 'app/shared/model/pedagogico/horario.model';
import { HorarioService } from './horario.service';
import { ITurma } from 'app/shared/model/pedagogico/turma.model';
import { TurmaService } from 'app/entities/pedagogico/turma/turma.service';
import { IProfessor } from 'app/shared/model/pedagogico/professor.model';
import { ProfessorService } from 'app/entities/pedagogico/professor/professor.service';
import { IPlanoCurricular } from 'app/shared/model/pedagogico/plano-curricular.model';
import { PlanoCurricularService } from 'app/entities/pedagogico/plano-curricular/plano-curricular.service';
import { LookupService } from 'app/entities/lookup/lookup.service';

type SelectableEntity = ITurma | IProfessor | IPlanoCurricular;

@Component({
  selector: 'rv-horario-update',
  templateUrl: './horario-update.component.html'
})
export class HorarioUpdateComponent implements OnInit {
  isSaving = false;

  categorias: any;
  diasSemana: any;
  entradas: any;
  saidas: any;

  turmas: ITurma[] = [];

  professors: IProfessor[] = [];

  planocurriculars: IPlanoCurricular[] = [];

  editForm = this.fb.group({
    id: [],
    inicio: [null, [Validators.required]],
    fim: [null, [Validators.required]],
    data: [null, [Validators.required]],
    anoLectivo: [null, [Validators.required]],
    diaSemana: [null, [Validators.required]],
    categoria: [null, [Validators.required]],
    turmaId: [null, Validators.required],
    professorId: [],
    curriculoId: [null, Validators.required]
  });

  constructor(
    protected horarioService: HorarioService,
    protected turmaService: TurmaService,
    protected professorService: ProfessorService,
    protected planoCurricularService: PlanoCurricularService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private lookupService: LookupService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ horario }) => {
      this.updateForm(horario);

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

      this.planoCurricularService
        .query()
        .pipe(
          map((res: HttpResponse<IPlanoCurricular[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IPlanoCurricular[]) => (this.planocurriculars = resBody));
    });
    this.lookupService.query({ 'entidadeId.equals': 20 }).subscribe(data => {
      this.categorias = data.body;
    });
    this.lookupService.query({ 'entidadeId.equals': 18 }).subscribe(data => {
      this.diasSemana = data.body;
    });
    this.lookupService.query({ 'entidadeId.equals': 16 }).subscribe(data => {
      this.entradas = data.body;
    });
    this.lookupService.query({ 'entidadeId.equals': 17 }).subscribe(data => {
      this.saidas = data.body;
    });
  }

  updateForm(horario: IHorario): void {
    this.editForm.patchValue({
      id: horario.id,
      inicio: horario.inicio,
      fim: horario.fim,
      data: horario.data != null ? horario.data.format(DATE_TIME_FORMAT) : null,
      anoLectivo: horario.anoLectivo,
      diaSemana: horario.diaSemana,
      categoria: horario.categoria,
      turmaId: horario.turmaId,
      professorId: horario.professorId,
      curriculoId: horario.curriculoId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const horario = this.createFromForm();
    if (horario.id !== undefined) {
      this.subscribeToSaveResponse(this.horarioService.update(horario));
    } else {
      this.subscribeToSaveResponse(this.horarioService.create(horario));
    }
  }

  private createFromForm(): IHorario {
    return {
      ...new Horario(),
      id: this.editForm.get(['id'])!.value,
      inicio: this.editForm.get(['inicio'])!.value,
      fim: this.editForm.get(['fim'])!.value,
      data: this.editForm.get(['data'])!.value != null ? moment(this.editForm.get(['data'])!.value, DATE_TIME_FORMAT) : undefined,
      anoLectivo: this.editForm.get(['anoLectivo'])!.value,
      diaSemana: this.editForm.get(['diaSemana'])!.value,
      categoria: this.editForm.get(['categoria'])!.value,
      turmaId: this.editForm.get(['turmaId'])!.value,
      professorId: this.editForm.get(['professorId'])!.value,
      curriculoId: this.editForm.get(['curriculoId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHorario>>): void {
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
