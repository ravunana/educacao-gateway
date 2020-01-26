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

import { IOcorrencia, Ocorrencia } from 'app/shared/model/secretaria/ocorrencia.model';
import { OcorrenciaService } from './ocorrencia.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IAluno } from 'app/shared/model/secretaria/aluno.model';
import { AlunoService } from 'app/entities/secretaria/aluno/aluno.service';

@Component({
  selector: 'rv-ocorrencia-update',
  templateUrl: './ocorrencia-update.component.html'
})
export class OcorrenciaUpdateComponent implements OnInit {
  isSaving = false;

  alunos: IAluno[] = [];
  deDp: any;
  ateDp: any;

  editForm = this.fb.group({
    id: [],
    tipoOcorrencia: [null, [Validators.required]],
    data: [null, [Validators.required]],
    numero: [null, [Validators.required]],
    reportarEncarregado: [null, [Validators.required]],
    de: [],
    ate: [],
    descricao: [null, [Validators.required]],
    matriculaId: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected ocorrenciaService: OcorrenciaService,
    protected alunoService: AlunoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ocorrencia }) => {
      this.updateForm(ocorrencia);

      this.alunoService
        .query()
        .pipe(
          map((res: HttpResponse<IAluno[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAluno[]) => (this.alunos = resBody));
    });
  }

  updateForm(ocorrencia: IOcorrencia): void {
    this.editForm.patchValue({
      id: ocorrencia.id,
      tipoOcorrencia: ocorrencia.tipoOcorrencia,
      data: ocorrencia.data != null ? ocorrencia.data.format(DATE_TIME_FORMAT) : null,
      numero: ocorrencia.numero,
      reportarEncarregado: ocorrencia.reportarEncarregado,
      de: ocorrencia.de,
      ate: ocorrencia.ate,
      descricao: ocorrencia.descricao,
      matriculaId: ocorrencia.matriculaId
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
    const ocorrencia = this.createFromForm();
    if (ocorrencia.id !== undefined) {
      this.subscribeToSaveResponse(this.ocorrenciaService.update(ocorrencia));
    } else {
      this.subscribeToSaveResponse(this.ocorrenciaService.create(ocorrencia));
    }
  }

  private createFromForm(): IOcorrencia {
    return {
      ...new Ocorrencia(),
      id: this.editForm.get(['id'])!.value,
      tipoOcorrencia: this.editForm.get(['tipoOcorrencia'])!.value,
      data: this.editForm.get(['data'])!.value != null ? moment(this.editForm.get(['data'])!.value, DATE_TIME_FORMAT) : undefined,
      numero: this.editForm.get(['numero'])!.value,
      reportarEncarregado: this.editForm.get(['reportarEncarregado'])!.value,
      de: this.editForm.get(['de'])!.value,
      ate: this.editForm.get(['ate'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      matriculaId: this.editForm.get(['matriculaId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOcorrencia>>): void {
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

  trackById(index: number, item: IAluno): any {
    return item.id;
  }
}
