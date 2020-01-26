import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPagamentoEmolumento, PagamentoEmolumento } from 'app/shared/model/pagamento/pagamento-emolumento.model';
import { PagamentoEmolumentoService } from './pagamento-emolumento.service';
import { IFormaLiquidacao } from 'app/shared/model/pagamento/forma-liquidacao.model';
import { FormaLiquidacaoService } from 'app/entities/pagamento/forma-liquidacao/forma-liquidacao.service';

@Component({
  selector: 'rv-pagamento-emolumento-update',
  templateUrl: './pagamento-emolumento-update.component.html'
})
export class PagamentoEmolumentoUpdateComponent implements OnInit {
  isSaving = false;

  formaliquidacaos: IFormaLiquidacao[] = [];

  editForm = this.fb.group({
    id: [],
    data: [],
    numero: [null, [Validators.required]],
    numeroProcesso: [null, [Validators.required]],
    nomeAluno: [null, [Validators.required]],
    turmaAluno: [null, [Validators.required]],
    estado: [],
    formaLiquidacaoId: [null, Validators.required]
  });

  constructor(
    protected pagamentoEmolumentoService: PagamentoEmolumentoService,
    protected formaLiquidacaoService: FormaLiquidacaoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pagamentoEmolumento }) => {
      this.updateForm(pagamentoEmolumento);

      this.formaLiquidacaoService
        .query()
        .pipe(
          map((res: HttpResponse<IFormaLiquidacao[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IFormaLiquidacao[]) => (this.formaliquidacaos = resBody));
    });
  }

  updateForm(pagamentoEmolumento: IPagamentoEmolumento): void {
    this.editForm.patchValue({
      id: pagamentoEmolumento.id,
      data: pagamentoEmolumento.data != null ? pagamentoEmolumento.data.format(DATE_TIME_FORMAT) : null,
      numero: pagamentoEmolumento.numero,
      numeroProcesso: pagamentoEmolumento.numeroProcesso,
      nomeAluno: pagamentoEmolumento.nomeAluno,
      turmaAluno: pagamentoEmolumento.turmaAluno,
      estado: pagamentoEmolumento.estado,
      formaLiquidacaoId: pagamentoEmolumento.formaLiquidacaoId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pagamentoEmolumento = this.createFromForm();
    if (pagamentoEmolumento.id !== undefined) {
      this.subscribeToSaveResponse(this.pagamentoEmolumentoService.update(pagamentoEmolumento));
    } else {
      this.subscribeToSaveResponse(this.pagamentoEmolumentoService.create(pagamentoEmolumento));
    }
  }

  private createFromForm(): IPagamentoEmolumento {
    return {
      ...new PagamentoEmolumento(),
      id: this.editForm.get(['id'])!.value,
      data: this.editForm.get(['data'])!.value != null ? moment(this.editForm.get(['data'])!.value, DATE_TIME_FORMAT) : undefined,
      numero: this.editForm.get(['numero'])!.value,
      numeroProcesso: this.editForm.get(['numeroProcesso'])!.value,
      nomeAluno: this.editForm.get(['nomeAluno'])!.value,
      turmaAluno: this.editForm.get(['turmaAluno'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      formaLiquidacaoId: this.editForm.get(['formaLiquidacaoId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPagamentoEmolumento>>): void {
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

  trackById(index: number, item: IFormaLiquidacao): any {
    return item.id;
  }
}
