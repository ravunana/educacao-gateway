import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProvaAptidaoProfissional, ProvaAptidaoProfissional } from 'app/shared/model/pedagogico/prova-aptidao-profissional.model';
import { ProvaAptidaoProfissionalService } from './prova-aptidao-profissional.service';

@Component({
  selector: 'rv-prova-aptidao-profissional-update',
  templateUrl: './prova-aptidao-profissional-update.component.html'
})
export class ProvaAptidaoProfissionalUpdateComponent implements OnInit {
  isSaving = false;
  inicioEstagioDp: any;
  finalEstagioDp: any;

  editForm = this.fb.group({
    id: [],
    numeroProcesso: [null, [Validators.required]],
    nomeAluno: [null, [Validators.required]],
    livroRegistro: [],
    folhaRegistro: [],
    temaProjectoTecnologio: [],
    notaProjectoTecnologio: [null, [Validators.min(0), Validators.max(20)]],
    dataDefesa: [],
    localEstagio: [],
    aproveitamentoEstagio: [],
    inicioEstagio: [],
    finalEstagio: [],
    data: []
  });

  constructor(
    protected provaAptidaoProfissionalService: ProvaAptidaoProfissionalService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ provaAptidaoProfissional }) => {
      this.updateForm(provaAptidaoProfissional);
    });
  }

  updateForm(provaAptidaoProfissional: IProvaAptidaoProfissional): void {
    this.editForm.patchValue({
      id: provaAptidaoProfissional.id,
      numeroProcesso: provaAptidaoProfissional.numeroProcesso,
      nomeAluno: provaAptidaoProfissional.nomeAluno,
      livroRegistro: provaAptidaoProfissional.livroRegistro,
      folhaRegistro: provaAptidaoProfissional.folhaRegistro,
      temaProjectoTecnologio: provaAptidaoProfissional.temaProjectoTecnologio,
      notaProjectoTecnologio: provaAptidaoProfissional.notaProjectoTecnologio,
      dataDefesa: provaAptidaoProfissional.dataDefesa != null ? provaAptidaoProfissional.dataDefesa.format(DATE_TIME_FORMAT) : null,
      localEstagio: provaAptidaoProfissional.localEstagio,
      aproveitamentoEstagio: provaAptidaoProfissional.aproveitamentoEstagio,
      inicioEstagio: provaAptidaoProfissional.inicioEstagio,
      finalEstagio: provaAptidaoProfissional.finalEstagio,
      data: provaAptidaoProfissional.data != null ? provaAptidaoProfissional.data.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const provaAptidaoProfissional = this.createFromForm();
    if (provaAptidaoProfissional.id !== undefined) {
      this.subscribeToSaveResponse(this.provaAptidaoProfissionalService.update(provaAptidaoProfissional));
    } else {
      this.subscribeToSaveResponse(this.provaAptidaoProfissionalService.create(provaAptidaoProfissional));
    }
  }

  private createFromForm(): IProvaAptidaoProfissional {
    return {
      ...new ProvaAptidaoProfissional(),
      id: this.editForm.get(['id'])!.value,
      numeroProcesso: this.editForm.get(['numeroProcesso'])!.value,
      nomeAluno: this.editForm.get(['nomeAluno'])!.value,
      livroRegistro: this.editForm.get(['livroRegistro'])!.value,
      folhaRegistro: this.editForm.get(['folhaRegistro'])!.value,
      temaProjectoTecnologio: this.editForm.get(['temaProjectoTecnologio'])!.value,
      notaProjectoTecnologio: this.editForm.get(['notaProjectoTecnologio'])!.value,
      dataDefesa:
        this.editForm.get(['dataDefesa'])!.value != null ? moment(this.editForm.get(['dataDefesa'])!.value, DATE_TIME_FORMAT) : undefined,
      localEstagio: this.editForm.get(['localEstagio'])!.value,
      aproveitamentoEstagio: this.editForm.get(['aproveitamentoEstagio'])!.value,
      inicioEstagio: this.editForm.get(['inicioEstagio'])!.value,
      finalEstagio: this.editForm.get(['finalEstagio'])!.value,
      data: this.editForm.get(['data'])!.value != null ? moment(this.editForm.get(['data'])!.value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProvaAptidaoProfissional>>): void {
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
