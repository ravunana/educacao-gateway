import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITurma, Turma } from 'app/shared/model/pedagogico/turma.model';
import { TurmaService } from './turma.service';
import { ICurso } from 'app/shared/model/pedagogico/curso.model';
import { CursoService } from 'app/entities/pedagogico/curso/curso.service';
import { IProfessor } from 'app/shared/model/pedagogico/professor.model';
import { ProfessorService } from 'app/entities/pedagogico/professor/professor.service';

type SelectableEntity = ICurso | IProfessor;

@Component({
  selector: 'rv-turma-update',
  templateUrl: './turma-update.component.html'
})
export class TurmaUpdateComponent implements OnInit {
  isSaving = false;

  cursos: ICurso[] = [];

  professors: IProfessor[] = [];
  aberturaDp: any;
  encerramentoDp: any;

  editForm = this.fb.group({
    id: [],
    descricao: [null, [Validators.required]],
    anoLectivo: [null, [Validators.required]],
    data: [null, [Validators.required]],
    abertura: [null, [Validators.required]],
    encerramento: [null, [Validators.required]],
    lotacao: [null, [Validators.required, Validators.min(1)]],
    aberta: [null, [Validators.required]],
    periodoLectivo: [null, [Validators.required]],
    turno: [null, [Validators.required]],
    sala: [null, [Validators.required]],
    classe: [null, [Validators.required]],
    cursoId: [null, Validators.required],
    coordenadorId: [null, Validators.required]
  });

  constructor(
    protected turmaService: TurmaService,
    protected cursoService: CursoService,
    protected professorService: ProfessorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ turma }) => {
      this.updateForm(turma);

      this.cursoService
        .query()
        .pipe(
          map((res: HttpResponse<ICurso[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICurso[]) => (this.cursos = resBody));

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

  updateForm(turma: ITurma): void {
    this.editForm.patchValue({
      id: turma.id,
      descricao: turma.descricao,
      anoLectivo: turma.anoLectivo,
      data: turma.data != null ? turma.data.format(DATE_TIME_FORMAT) : null,
      abertura: turma.abertura,
      encerramento: turma.encerramento,
      lotacao: turma.lotacao,
      aberta: turma.aberta,
      periodoLectivo: turma.periodoLectivo,
      turno: turma.turno,
      sala: turma.sala,
      classe: turma.classe,
      cursoId: turma.cursoId,
      coordenadorId: turma.coordenadorId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const turma = this.createFromForm();
    if (turma.id !== undefined) {
      this.subscribeToSaveResponse(this.turmaService.update(turma));
    } else {
      this.subscribeToSaveResponse(this.turmaService.create(turma));
    }
  }

  private createFromForm(): ITurma {
    return {
      ...new Turma(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      anoLectivo: this.editForm.get(['anoLectivo'])!.value,
      data: this.editForm.get(['data'])!.value != null ? moment(this.editForm.get(['data'])!.value, DATE_TIME_FORMAT) : undefined,
      abertura: this.editForm.get(['abertura'])!.value,
      encerramento: this.editForm.get(['encerramento'])!.value,
      lotacao: this.editForm.get(['lotacao'])!.value,
      aberta: this.editForm.get(['aberta'])!.value,
      periodoLectivo: this.editForm.get(['periodoLectivo'])!.value,
      turno: this.editForm.get(['turno'])!.value,
      sala: this.editForm.get(['sala'])!.value,
      classe: this.editForm.get(['classe'])!.value,
      cursoId: this.editForm.get(['cursoId'])!.value,
      coordenadorId: this.editForm.get(['coordenadorId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITurma>>): void {
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
