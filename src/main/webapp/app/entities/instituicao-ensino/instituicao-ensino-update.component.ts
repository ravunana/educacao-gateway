import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IInstituicaoEnsino, InstituicaoEnsino } from 'app/shared/model/instituicao-ensino.model';
import { InstituicaoEnsinoService } from './instituicao-ensino.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'rv-instituicao-ensino-update',
  templateUrl: './instituicao-ensino-update.component.html'
})
export class InstituicaoEnsinoUpdateComponent implements OnInit {
  isSaving = false;

  instituicaoensinos: IInstituicaoEnsino[] = [];
  fundacaoDp: any;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    logotipo: [null, [Validators.required]],
    logotipoContentType: [],
    fundacao: [],
    fundador: [],
    numero: [null, [Validators.required]],
    dimensao: [],
    sede: [null, [Validators.required]],
    tipoVinculo: [],
    unidadePagadora: [],
    tipoInstalacao: [],
    provincia: [null, [Validators.required]],
    municipio: [null, [Validators.required]],
    bairro: [null, [Validators.required]],
    rua: [null, [Validators.required, Validators.maxLength(200)]],
    quarteirao: [null, [Validators.required, Validators.maxLength(10)]],
    numeroPorta: [null, [Validators.required, Validators.maxLength(10)]],
    hierarquiaId: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected instituicaoEnsinoService: InstituicaoEnsinoService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ instituicaoEnsino }) => {
      this.updateForm(instituicaoEnsino);

      this.instituicaoEnsinoService
        .query()
        .pipe(
          map((res: HttpResponse<IInstituicaoEnsino[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IInstituicaoEnsino[]) => (this.instituicaoensinos = resBody));
    });
  }

  updateForm(instituicaoEnsino: IInstituicaoEnsino): void {
    this.editForm.patchValue({
      id: instituicaoEnsino.id,
      nome: instituicaoEnsino.nome,
      logotipo: instituicaoEnsino.logotipo,
      logotipoContentType: instituicaoEnsino.logotipoContentType,
      fundacao: instituicaoEnsino.fundacao,
      fundador: instituicaoEnsino.fundador,
      numero: instituicaoEnsino.numero,
      dimensao: instituicaoEnsino.dimensao,
      sede: instituicaoEnsino.sede,
      tipoVinculo: instituicaoEnsino.tipoVinculo,
      unidadePagadora: instituicaoEnsino.unidadePagadora,
      tipoInstalacao: instituicaoEnsino.tipoInstalacao,
      provincia: instituicaoEnsino.provincia,
      municipio: instituicaoEnsino.municipio,
      bairro: instituicaoEnsino.bairro,
      rua: instituicaoEnsino.rua,
      quarteirao: instituicaoEnsino.quarteirao,
      numeroPorta: instituicaoEnsino.numeroPorta,
      hierarquiaId: instituicaoEnsino.hierarquiaId
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

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const instituicaoEnsino = this.createFromForm();
    if (instituicaoEnsino.id !== undefined) {
      this.subscribeToSaveResponse(this.instituicaoEnsinoService.update(instituicaoEnsino));
    } else {
      this.subscribeToSaveResponse(this.instituicaoEnsinoService.create(instituicaoEnsino));
    }
  }

  private createFromForm(): IInstituicaoEnsino {
    return {
      ...new InstituicaoEnsino(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      logotipoContentType: this.editForm.get(['logotipoContentType'])!.value,
      logotipo: this.editForm.get(['logotipo'])!.value,
      fundacao: this.editForm.get(['fundacao'])!.value,
      fundador: this.editForm.get(['fundador'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      dimensao: this.editForm.get(['dimensao'])!.value,
      sede: this.editForm.get(['sede'])!.value,
      tipoVinculo: this.editForm.get(['tipoVinculo'])!.value,
      unidadePagadora: this.editForm.get(['unidadePagadora'])!.value,
      tipoInstalacao: this.editForm.get(['tipoInstalacao'])!.value,
      provincia: this.editForm.get(['provincia'])!.value,
      municipio: this.editForm.get(['municipio'])!.value,
      bairro: this.editForm.get(['bairro'])!.value,
      rua: this.editForm.get(['rua'])!.value,
      quarteirao: this.editForm.get(['quarteirao'])!.value,
      numeroPorta: this.editForm.get(['numeroPorta'])!.value,
      hierarquiaId: this.editForm.get(['hierarquiaId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInstituicaoEnsino>>): void {
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

  trackById(index: number, item: IInstituicaoEnsino): any {
    return item.id;
  }
}
