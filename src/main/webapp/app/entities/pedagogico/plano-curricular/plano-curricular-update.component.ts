import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPlanoCurricular, PlanoCurricular } from 'app/shared/model/pedagogico/plano-curricular.model';
import { PlanoCurricularService } from './plano-curricular.service';
import { ICurso } from 'app/shared/model/pedagogico/curso.model';
import { CursoService } from 'app/entities/pedagogico/curso/curso.service';

@Component({
  selector: 'rv-plano-curricular-update',
  templateUrl: './plano-curricular-update.component.html'
})
export class PlanoCurricularUpdateComponent implements OnInit {
  isSaving = false;

  cursos: ICurso[] = [];

  editForm = this.fb.group({
    id: [],
    descricao: [],
    terminal: [null, [Validators.required]],
    tempoSemanal: [null, [Validators.required, Validators.min(1), Validators.max(10)]],
    periodoLectivo: [],
    componente: [null, [Validators.required]],
    disciplina: [null, [Validators.required]],
    classe: [null, [Validators.required]],
    cursoId: [null, Validators.required]
  });

  constructor(
    protected planoCurricularService: PlanoCurricularService,
    protected cursoService: CursoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planoCurricular }) => {
      this.updateForm(planoCurricular);

      this.cursoService
        .query()
        .pipe(
          map((res: HttpResponse<ICurso[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICurso[]) => (this.cursos = resBody));
    });
  }

  updateForm(planoCurricular: IPlanoCurricular): void {
    this.editForm.patchValue({
      id: planoCurricular.id,
      descricao: planoCurricular.descricao,
      terminal: planoCurricular.terminal,
      tempoSemanal: planoCurricular.tempoSemanal,
      periodoLectivo: planoCurricular.periodoLectivo,
      componente: planoCurricular.componente,
      disciplina: planoCurricular.disciplina,
      classe: planoCurricular.classe,
      cursoId: planoCurricular.cursoId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const planoCurricular = this.createFromForm();
    if (planoCurricular.id !== undefined) {
      this.subscribeToSaveResponse(this.planoCurricularService.update(planoCurricular));
    } else {
      this.subscribeToSaveResponse(this.planoCurricularService.create(planoCurricular));
    }
  }

  private createFromForm(): IPlanoCurricular {
    return {
      ...new PlanoCurricular(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      terminal: this.editForm.get(['terminal'])!.value,
      tempoSemanal: this.editForm.get(['tempoSemanal'])!.value,
      periodoLectivo: this.editForm.get(['periodoLectivo'])!.value,
      componente: this.editForm.get(['componente'])!.value,
      disciplina: this.editForm.get(['disciplina'])!.value,
      classe: this.editForm.get(['classe'])!.value,
      cursoId: this.editForm.get(['cursoId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlanoCurricular>>): void {
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

  trackById(index: number, item: ICurso): any {
    return item.id;
  }
}
