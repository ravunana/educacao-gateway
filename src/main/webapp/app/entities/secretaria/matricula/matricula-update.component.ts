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

import { IMatricula, Matricula } from 'app/shared/model/secretaria/matricula.model';
import { MatriculaService } from './matricula.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IAluno } from 'app/shared/model/secretaria/aluno.model';
import { AlunoService } from 'app/entities/secretaria/aluno/aluno.service';
import { ICategoriaAluno } from 'app/shared/model/secretaria/categoria-aluno.model';
import { CategoriaAlunoService } from 'app/entities/secretaria/categoria-aluno/categoria-aluno.service';

type SelectableEntity = IAluno | ICategoriaAluno;

@Component({
  selector: 'rv-matricula-update',
  templateUrl: './matricula-update.component.html'
})
export class MatriculaUpdateComponent implements OnInit {
  isSaving = false;

  alunos: IAluno[] = [];

  categoriaalunos: ICategoriaAluno[] = [];

  editForm = this.fb.group({
    id: [],
    data: [],
    numeroChamada: [null, [Validators.required, Validators.min(1)]],
    anoLectivo: [null, [Validators.required]],
    fotografia: [null, [Validators.required]],
    certificado: [null, [Validators.required]],
    documentoIdentificacao: [null, [Validators.required]],
    resenciamentoMilitar: [],
    documentoSaude: [],
    fichaTransferencia: [],
    historicoEscolar: [],
    observacao: [],
    confirmacao: [null, [Validators.required]],
    periodoLectivo: [null, [Validators.required]],
    turma: [null, [Validators.required]],
    curso: [null, [Validators.required]],
    turno: [null, [Validators.required]],
    sala: [null, [Validators.required]],
    classe: [null, [Validators.required]],
    alunoId: [null, Validators.required],
    categoriaId: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected matriculaService: MatriculaService,
    protected alunoService: AlunoService,
    protected categoriaAlunoService: CategoriaAlunoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ matricula }) => {
      this.updateForm(matricula);

      this.alunoService
        .query()
        .pipe(
          map((res: HttpResponse<IAluno[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAluno[]) => (this.alunos = resBody));

      this.categoriaAlunoService
        .query()
        .pipe(
          map((res: HttpResponse<ICategoriaAluno[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICategoriaAluno[]) => (this.categoriaalunos = resBody));
    });
  }

  updateForm(matricula: IMatricula): void {
    this.editForm.patchValue({
      id: matricula.id,
      data: matricula.data != null ? matricula.data.format(DATE_TIME_FORMAT) : null,
      numeroChamada: matricula.numeroChamada,
      anoLectivo: matricula.anoLectivo,
      fotografia: matricula.fotografia,
      certificado: matricula.certificado,
      documentoIdentificacao: matricula.documentoIdentificacao,
      resenciamentoMilitar: matricula.resenciamentoMilitar,
      documentoSaude: matricula.documentoSaude,
      fichaTransferencia: matricula.fichaTransferencia,
      historicoEscolar: matricula.historicoEscolar,
      observacao: matricula.observacao,
      confirmacao: matricula.confirmacao,
      periodoLectivo: matricula.periodoLectivo,
      turma: matricula.turma,
      curso: matricula.curso,
      turno: matricula.turno,
      sala: matricula.sala,
      classe: matricula.classe,
      alunoId: matricula.alunoId,
      categoriaId: matricula.categoriaId
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
    const matricula = this.createFromForm();
    if (matricula.id !== undefined) {
      this.subscribeToSaveResponse(this.matriculaService.update(matricula));
    } else {
      this.subscribeToSaveResponse(this.matriculaService.create(matricula));
    }
  }

  private createFromForm(): IMatricula {
    return {
      ...new Matricula(),
      id: this.editForm.get(['id'])!.value,
      data: this.editForm.get(['data'])!.value != null ? moment(this.editForm.get(['data'])!.value, DATE_TIME_FORMAT) : undefined,
      numeroChamada: this.editForm.get(['numeroChamada'])!.value,
      anoLectivo: this.editForm.get(['anoLectivo'])!.value,
      fotografia: this.editForm.get(['fotografia'])!.value,
      certificado: this.editForm.get(['certificado'])!.value,
      documentoIdentificacao: this.editForm.get(['documentoIdentificacao'])!.value,
      resenciamentoMilitar: this.editForm.get(['resenciamentoMilitar'])!.value,
      documentoSaude: this.editForm.get(['documentoSaude'])!.value,
      fichaTransferencia: this.editForm.get(['fichaTransferencia'])!.value,
      historicoEscolar: this.editForm.get(['historicoEscolar'])!.value,
      observacao: this.editForm.get(['observacao'])!.value,
      confirmacao: this.editForm.get(['confirmacao'])!.value,
      periodoLectivo: this.editForm.get(['periodoLectivo'])!.value,
      turma: this.editForm.get(['turma'])!.value,
      curso: this.editForm.get(['curso'])!.value,
      turno: this.editForm.get(['turno'])!.value,
      sala: this.editForm.get(['sala'])!.value,
      classe: this.editForm.get(['classe'])!.value,
      alunoId: this.editForm.get(['alunoId'])!.value,
      categoriaId: this.editForm.get(['categoriaId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMatricula>>): void {
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
