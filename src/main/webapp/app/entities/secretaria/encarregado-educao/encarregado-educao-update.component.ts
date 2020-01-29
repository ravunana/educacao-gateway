import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEncarregadoEducao, EncarregadoEducao } from 'app/shared/model/secretaria/encarregado-educao.model';
import { EncarregadoEducaoService } from './encarregado-educao.service';
import { LookupService } from 'app/entities/lookup/lookup.service';

@Component({
  selector: 'rv-encarregado-educao-update',
  templateUrl: './encarregado-educao-update.component.html'
})
export class EncarregadoEducaoUpdateComponent implements OnInit {
  isSaving = false;

  sexos: any;
  grausParentesco: any;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    sexo: [null, [Validators.required]],
    nif: [null, []],
    numeroIdentificacao: [null, []],
    residencia: [],
    contactoPessoal: [null, [Validators.required]],
    contactoTrabalho: [null, []],
    contactoResidencia: [null, []],
    email: [null, []],
    localTrabalho: [],
    cargo: [],
    salario: [null, [Validators.min(0)]],
    grauParentesco: [null, [Validators.required]]
  });

  constructor(
    protected encarregadoEducaoService: EncarregadoEducaoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private lookupService: LookupService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ encarregadoEducao }) => {
      this.updateForm(encarregadoEducao);
    });
    this.lookupService.query({ 'entidadeId.equals': 8 }).subscribe(data => {
      this.sexos = data.body;
    });
    this.lookupService.query({ 'entidadeId.equals': 31 }).subscribe(data => {
      this.grausParentesco = data.body;
    });
  }

  updateForm(encarregadoEducao: IEncarregadoEducao): void {
    this.editForm.patchValue({
      id: encarregadoEducao.id,
      nome: encarregadoEducao.nome,
      sexo: encarregadoEducao.sexo,
      nif: encarregadoEducao.nif,
      numeroIdentificacao: encarregadoEducao.numeroIdentificacao,
      residencia: encarregadoEducao.residencia,
      contactoPessoal: encarregadoEducao.contactoPessoal,
      contactoTrabalho: encarregadoEducao.contactoTrabalho,
      contactoResidencia: encarregadoEducao.contactoResidencia,
      email: encarregadoEducao.email,
      localTrabalho: encarregadoEducao.localTrabalho,
      cargo: encarregadoEducao.cargo,
      salario: encarregadoEducao.salario,
      grauParentesco: encarregadoEducao.grauParentesco
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const encarregadoEducao = this.createFromForm();
    if (encarregadoEducao.id !== undefined) {
      this.subscribeToSaveResponse(this.encarregadoEducaoService.update(encarregadoEducao));
    } else {
      this.subscribeToSaveResponse(this.encarregadoEducaoService.create(encarregadoEducao));
    }
  }

  private createFromForm(): IEncarregadoEducao {
    return {
      ...new EncarregadoEducao(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      sexo: this.editForm.get(['sexo'])!.value,
      nif: this.editForm.get(['nif'])!.value,
      numeroIdentificacao: this.editForm.get(['numeroIdentificacao'])!.value,
      residencia: this.editForm.get(['residencia'])!.value,
      contactoPessoal: this.editForm.get(['contactoPessoal'])!.value,
      contactoTrabalho: this.editForm.get(['contactoTrabalho'])!.value,
      contactoResidencia: this.editForm.get(['contactoResidencia'])!.value,
      email: this.editForm.get(['email'])!.value,
      localTrabalho: this.editForm.get(['localTrabalho'])!.value,
      cargo: this.editForm.get(['cargo'])!.value,
      salario: this.editForm.get(['salario'])!.value,
      grauParentesco: this.editForm.get(['grauParentesco'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEncarregadoEducao>>): void {
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
