import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAula, Aula } from 'app/shared/model/pedagogico/aula.model';
import { AulaService } from './aula.service';
import { IPlanoAula } from 'app/shared/model/pedagogico/plano-aula.model';
import { PlanoAulaService } from 'app/entities/pedagogico/plano-aula/plano-aula.service';
import { ITurma } from 'app/shared/model/pedagogico/turma.model';
import { TurmaService } from 'app/entities/pedagogico/turma/turma.service';
import { IPlanoCurricular } from 'app/shared/model/pedagogico/plano-curricular.model';
import { PlanoCurricularService } from 'app/entities/pedagogico/plano-curricular/plano-curricular.service';

type SelectableEntity = IPlanoAula | ITurma | IPlanoCurricular;

@Component({
  selector: 'rv-aula-update',
  templateUrl: './aula-update.component.html'
})
export class AulaUpdateComponent implements OnInit {
  isSaving = false;

  planoaulas: IPlanoAula[] = [];

  turmas: ITurma[] = [];

  planocurriculars: IPlanoCurricular[] = [];

  editForm = this.fb.group({
    id: [],
    data: [null, [Validators.required]],
    sumario: [null, [Validators.required]],
    licao: [null, [Validators.required]],
    dada: [null, [Validators.required]],
    planoAulas: [],
    turmaId: [null, Validators.required],
    curriuloId: [null, Validators.required]
  });

  constructor(
    protected aulaService: AulaService,
    protected planoAulaService: PlanoAulaService,
    protected turmaService: TurmaService,
    protected planoCurricularService: PlanoCurricularService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ aula }) => {
      this.updateForm(aula);

      this.planoAulaService
        .query()
        .pipe(
          map((res: HttpResponse<IPlanoAula[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IPlanoAula[]) => (this.planoaulas = resBody));

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
    });
  }

  updateForm(aula: IAula): void {
    this.editForm.patchValue({
      id: aula.id,
      data: aula.data != null ? aula.data.format(DATE_TIME_FORMAT) : null,
      sumario: aula.sumario,
      licao: aula.licao,
      dada: aula.dada,
      planoAulas: aula.planoAulas,
      turmaId: aula.turmaId,
      curriuloId: aula.curriuloId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const aula = this.createFromForm();
    if (aula.id !== undefined) {
      this.subscribeToSaveResponse(this.aulaService.update(aula));
    } else {
      this.subscribeToSaveResponse(this.aulaService.create(aula));
    }
  }

  private createFromForm(): IAula {
    return {
      ...new Aula(),
      id: this.editForm.get(['id'])!.value,
      data: this.editForm.get(['data'])!.value != null ? moment(this.editForm.get(['data'])!.value, DATE_TIME_FORMAT) : undefined,
      sumario: this.editForm.get(['sumario'])!.value,
      licao: this.editForm.get(['licao'])!.value,
      dada: this.editForm.get(['dada'])!.value,
      planoAulas: this.editForm.get(['planoAulas'])!.value,
      turmaId: this.editForm.get(['turmaId'])!.value,
      curriuloId: this.editForm.get(['curriuloId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAula>>): void {
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

  getSelected(selectedVals: IPlanoAula[], option: IPlanoAula): IPlanoAula {
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
