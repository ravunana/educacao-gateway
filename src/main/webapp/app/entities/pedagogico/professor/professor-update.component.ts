import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IProfessor, Professor } from 'app/shared/model/pedagogico/professor.model';
import { ProfessorService } from './professor.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EntidadeSistemaService } from 'app/entities/entidade-sistema/entidade-sistema.service';
import { LookupService } from 'app/entities/lookup/lookup.service';

@Component({
  selector: 'rv-professor-update',
  templateUrl: './professor-update.component.html'
})
export class ProfessorUpdateComponent implements OnInit {
  isSaving = false;
  sexos: any;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    sexo: [null, [Validators.required]],
    fotografia: [],
    fotografiaContentType: [],
    contacto: [null, [Validators.required]],
    email: [null, []],
    residencia: [null, [Validators.required]],
    numeroAgente: [null, [Validators.required]],
    utilizadorId: [],
    grauAcademico: [null, [Validators.required]],
    cursoAcademico: [null, [Validators.required]],
    observacao: [],
    ativo: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected professorService: ProfessorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private lookupService: LookupService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ professor }) => {
      this.updateForm(professor);
    });
    this.lookupService.query({ 'entidadeId.equals': 8 }).subscribe(data => {
      this.sexos = data.body;
    });
  }

  updateForm(professor: IProfessor): void {
    this.editForm.patchValue({
      id: professor.id,
      nome: professor.nome,
      sexo: professor.sexo,
      fotografia: professor.fotografia,
      fotografiaContentType: professor.fotografiaContentType,
      contacto: professor.contacto,
      email: professor.email,
      residencia: professor.residencia,
      numeroAgente: professor.numeroAgente,
      utilizadorId: professor.utilizadorId,
      grauAcademico: professor.grauAcademico,
      cursoAcademico: professor.cursoAcademico,
      observacao: professor.observacao,
      ativo: professor.ativo
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
    const professor = this.createFromForm();
    if (professor.id !== undefined) {
      this.subscribeToSaveResponse(this.professorService.update(professor));
    } else {
      this.subscribeToSaveResponse(this.professorService.create(professor));
    }
  }

  private createFromForm(): IProfessor {
    return {
      ...new Professor(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      sexo: this.editForm.get(['sexo'])!.value,
      fotografiaContentType: this.editForm.get(['fotografiaContentType'])!.value,
      fotografia: this.editForm.get(['fotografia'])!.value,
      contacto: this.editForm.get(['contacto'])!.value,
      email: this.editForm.get(['email'])!.value,
      residencia: this.editForm.get(['residencia'])!.value,
      numeroAgente: this.editForm.get(['numeroAgente'])!.value,
      utilizadorId: this.editForm.get(['utilizadorId'])!.value,
      grauAcademico: this.editForm.get(['grauAcademico'])!.value,
      cursoAcademico: this.editForm.get(['cursoAcademico'])!.value,
      observacao: this.editForm.get(['observacao'])!.value,
      ativo: this.editForm.get(['ativo'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfessor>>): void {
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
}
