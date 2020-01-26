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

import { IDeposito, Deposito } from 'app/shared/model/pagamento/deposito.model';
import { DepositoService } from './deposito.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ICaixa } from 'app/shared/model/pagamento/caixa.model';
import { CaixaService } from 'app/entities/pagamento/caixa/caixa.service';

@Component({
  selector: 'rv-deposito-update',
  templateUrl: './deposito-update.component.html'
})
export class DepositoUpdateComponent implements OnInit {
  isSaving = false;

  caixas: ICaixa[] = [];
  dataDepositoDp: any;

  editForm = this.fb.group({
    id: [],
    numero: [null, [Validators.required]],
    dataDeposito: [null, [Validators.required]],
    montante: [null, [Validators.required, Validators.min(0)]],
    data: [null, [Validators.required]],
    anexo: [],
    anexoContentType: [],
    numeroProcesso: [null, [Validators.required]],
    meioLiquidacao: [null, [Validators.required]],
    bancoCaixaId: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected depositoService: DepositoService,
    protected caixaService: CaixaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deposito }) => {
      this.updateForm(deposito);

      this.caixaService
        .query()
        .pipe(
          map((res: HttpResponse<ICaixa[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICaixa[]) => (this.caixas = resBody));
    });
  }

  updateForm(deposito: IDeposito): void {
    this.editForm.patchValue({
      id: deposito.id,
      numero: deposito.numero,
      dataDeposito: deposito.dataDeposito,
      montante: deposito.montante,
      data: deposito.data != null ? deposito.data.format(DATE_TIME_FORMAT) : null,
      anexo: deposito.anexo,
      anexoContentType: deposito.anexoContentType,
      numeroProcesso: deposito.numeroProcesso,
      meioLiquidacao: deposito.meioLiquidacao,
      bancoCaixaId: deposito.bancoCaixaId
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
    const deposito = this.createFromForm();
    if (deposito.id !== undefined) {
      this.subscribeToSaveResponse(this.depositoService.update(deposito));
    } else {
      this.subscribeToSaveResponse(this.depositoService.create(deposito));
    }
  }

  private createFromForm(): IDeposito {
    return {
      ...new Deposito(),
      id: this.editForm.get(['id'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      dataDeposito: this.editForm.get(['dataDeposito'])!.value,
      montante: this.editForm.get(['montante'])!.value,
      data: this.editForm.get(['data'])!.value != null ? moment(this.editForm.get(['data'])!.value, DATE_TIME_FORMAT) : undefined,
      anexoContentType: this.editForm.get(['anexoContentType'])!.value,
      anexo: this.editForm.get(['anexo'])!.value,
      numeroProcesso: this.editForm.get(['numeroProcesso'])!.value,
      meioLiquidacao: this.editForm.get(['meioLiquidacao'])!.value,
      bancoCaixaId: this.editForm.get(['bancoCaixaId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeposito>>): void {
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

  trackById(index: number, item: ICaixa): any {
    return item.id;
  }
}
