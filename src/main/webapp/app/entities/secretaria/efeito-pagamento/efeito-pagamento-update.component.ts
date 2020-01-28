import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IEfeitoPagamento, EfeitoPagamento } from 'app/shared/model/secretaria/efeito-pagamento.model';
import { EfeitoPagamentoService } from './efeito-pagamento.service';
import { IDeposito } from 'app/shared/model/secretaria/deposito.model';
import { DepositoService } from 'app/entities/secretaria/deposito/deposito.service';
import { IEmolumento } from 'app/shared/model/secretaria/emolumento.model';
import { EmolumentoService } from 'app/entities/secretaria/emolumento/emolumento.service';
import { IPagamentoEmolumento } from 'app/shared/model/secretaria/pagamento-emolumento.model';
import { PagamentoEmolumentoService } from 'app/entities/secretaria/pagamento-emolumento/pagamento-emolumento.service';

type SelectableEntity = IDeposito | IEmolumento | IPagamentoEmolumento;

@Component({
  selector: 'rv-efeito-pagamento-update',
  templateUrl: './efeito-pagamento-update.component.html'
})
export class EfeitoPagamentoUpdateComponent implements OnInit {
  isSaving = false;

  depositos: IDeposito[] = [];

  emolumentos: IEmolumento[] = [];

  pagamentoemolumentos: IPagamentoEmolumento[] = [];
  vencimentoDp: any;

  editForm = this.fb.group({
    id: [],
    descricao: [],
    quantidade: [null, [Validators.required, Validators.min(1)]],
    montante: [null, [Validators.required, Validators.min(0)]],
    desconto: [null, [Validators.min(0)]],
    multa: [null, [Validators.min(0)]],
    juro: [null, [Validators.min(0)]],
    data: [],
    vencimento: [],
    quitado: [null, [Validators.required]],
    depositos: [],
    emolumentoId: [null, Validators.required],
    pagamentoId: [null, Validators.required]
  });

  constructor(
    protected efeitoPagamentoService: EfeitoPagamentoService,
    protected depositoService: DepositoService,
    protected emolumentoService: EmolumentoService,
    protected pagamentoEmolumentoService: PagamentoEmolumentoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ efeitoPagamento }) => {
      this.updateForm(efeitoPagamento);

      this.depositoService
        .query()
        .pipe(
          map((res: HttpResponse<IDeposito[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IDeposito[]) => (this.depositos = resBody));

      this.emolumentoService
        .query()
        .pipe(
          map((res: HttpResponse<IEmolumento[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IEmolumento[]) => (this.emolumentos = resBody));

      this.pagamentoEmolumentoService
        .query()
        .pipe(
          map((res: HttpResponse<IPagamentoEmolumento[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IPagamentoEmolumento[]) => (this.pagamentoemolumentos = resBody));
    });
  }

  updateForm(efeitoPagamento: IEfeitoPagamento): void {
    this.editForm.patchValue({
      id: efeitoPagamento.id,
      descricao: efeitoPagamento.descricao,
      quantidade: efeitoPagamento.quantidade,
      montante: efeitoPagamento.montante,
      desconto: efeitoPagamento.desconto,
      multa: efeitoPagamento.multa,
      juro: efeitoPagamento.juro,
      data: efeitoPagamento.data != null ? efeitoPagamento.data.format(DATE_TIME_FORMAT) : null,
      vencimento: efeitoPagamento.vencimento,
      quitado: efeitoPagamento.quitado,
      depositos: efeitoPagamento.depositos,
      emolumentoId: efeitoPagamento.emolumentoId,
      pagamentoId: efeitoPagamento.pagamentoId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const efeitoPagamento = this.createFromForm();
    if (efeitoPagamento.id !== undefined) {
      this.subscribeToSaveResponse(this.efeitoPagamentoService.update(efeitoPagamento));
    } else {
      this.subscribeToSaveResponse(this.efeitoPagamentoService.create(efeitoPagamento));
    }
  }

  private createFromForm(): IEfeitoPagamento {
    return {
      ...new EfeitoPagamento(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      quantidade: this.editForm.get(['quantidade'])!.value,
      montante: this.editForm.get(['montante'])!.value,
      desconto: this.editForm.get(['desconto'])!.value,
      multa: this.editForm.get(['multa'])!.value,
      juro: this.editForm.get(['juro'])!.value,
      data: this.editForm.get(['data'])!.value != null ? moment(this.editForm.get(['data'])!.value, DATE_TIME_FORMAT) : undefined,
      vencimento: this.editForm.get(['vencimento'])!.value,
      quitado: this.editForm.get(['quitado'])!.value,
      depositos: this.editForm.get(['depositos'])!.value,
      emolumentoId: this.editForm.get(['emolumentoId'])!.value,
      pagamentoId: this.editForm.get(['pagamentoId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEfeitoPagamento>>): void {
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

  getSelected(selectedVals: IDeposito[], option: IDeposito): IDeposito {
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
