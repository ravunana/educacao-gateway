import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IAluno, Aluno } from 'app/shared/model/secretaria/aluno.model';
import { AlunoService } from './aluno.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IEncarregadoEducao } from 'app/shared/model/secretaria/encarregado-educao.model';
import { EncarregadoEducaoService } from 'app/entities/secretaria/encarregado-educao/encarregado-educao.service';
import { LookupService } from 'app/entities/lookup/lookup.service';

@Component({
  selector: 'rv-aluno-update',
  templateUrl: './aluno-update.component.html'
})
export class AlunoUpdateComponent implements OnInit {
  isSaving = false;

  sexos: any;
  paises: any;
  municipios: any;
  tiposDocumento: any;
  gruposSanguinio: any;
  situacaosAcademica: any;
  classes: any;
  provincias: any;

  encarregadoeducaos: IEncarregadoEducao[] = [];
  nascimentoDp: any;
  emissaoDp: any;
  validadeDp: any;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    sexo: [null, [Validators.required]],
    fotografia: [],
    fotografiaContentType: [],
    pai: [null, [Validators.required]],
    mae: [null, [Validators.required]],
    nascimento: [null, [Validators.required]],
    nacionalidade: [null, [Validators.required]],
    naturalidade: [null, [Validators.required]],
    contacto: [null, [Validators.required]],
    email: [null, []],
    tipoDocumento: [null, [Validators.required]],
    numeroDocumento: [null, [Validators.required]],
    emissao: [null, [Validators.required]],
    validade: [null, [Validators.required]],
    localEmissao: [],
    nif: [null, []],
    provincia: [null, [Validators.required]],
    municipio: [null, [Validators.required]],
    bairro: [null, [Validators.required]],
    rua: [null, [Validators.required, Validators.maxLength(200)]],
    quarteirao: [null, [Validators.required, Validators.maxLength(10)]],
    numeroPorta: [null, [Validators.required, Validators.maxLength(10)]],
    fazEducacaoFisica: [null, [Validators.required]],
    grupoSanguinio: [],
    autorizaMedicamento: [null, [Validators.required]],
    altura: [null, [Validators.min(0)]],
    peso: [null, [Validators.min(0)]],
    nomeMedico: [],
    contactoMedico: [],
    desmaioConstante: [null, [Validators.required]],
    alergia: [],
    dificiencia: [],
    anoConclusao: [null, [Validators.required, Validators.min(2000)]],
    situacaoAnterior: [null, [Validators.required]],
    meioTransporte: [],
    escolaAnterior: [null, [Validators.required]],
    classeAnterior: [null, [Validators.required]],
    cursoAnterior: [null, [Validators.required]],
    data: [null, [Validators.required]],
    numeroProcesso: [null, [Validators.required]],
    transferido: [null, [Validators.required]],
    observacao: [],
    situacaoAtual: [],
    encarregadoId: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected alunoService: AlunoService,
    protected encarregadoEducaoService: EncarregadoEducaoService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private lookupService: LookupService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ aluno }) => {
      this.updateForm(aluno);

      this.encarregadoEducaoService
        .query()
        .pipe(
          map((res: HttpResponse<IEncarregadoEducao[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IEncarregadoEducao[]) => (this.encarregadoeducaos = resBody));
    });
    this.lookupService.query({ 'entidadeId.equals': 8 }).subscribe(data => {
      this.sexos = data.body;
    });
    this.lookupService.query({ 'entidadeId.equals': 27 }).subscribe(data => {
      this.paises = data.body;
    });
    this.lookupService.query({ 'entidadeId.equals': 5 }).subscribe(data => {
      this.municipios = data.body;
    });
    this.lookupService.query({ 'entidadeId.equals': 28 }).subscribe(data => {
      this.tiposDocumento = data.body;
    });
    this.lookupService.query({ 'entidadeId.equals': 29 }).subscribe(data => {
      this.gruposSanguinio = data.body;
    });
    this.lookupService.query({ 'entidadeId.equals': 13 }).subscribe(data => {
      this.classes = data.body;
    });
    this.lookupService.query({ 'entidadeId.equals': 30 }).subscribe(data => {
      this.situacaosAcademica = data.body;
    });
    this.lookupService.query({ 'entidadeId.equals': 4 }).subscribe(data => {
      this.provincias = data.body;
    });
  }

  updateForm(aluno: IAluno): void {
    this.editForm.patchValue({
      id: aluno.id,
      nome: aluno.nome,
      sexo: aluno.sexo,
      fotografia: aluno.fotografia,
      fotografiaContentType: aluno.fotografiaContentType,
      pai: aluno.pai,
      mae: aluno.mae,
      nascimento: aluno.nascimento,
      nacionalidade: aluno.nacionalidade,
      naturalidade: aluno.naturalidade,
      contacto: aluno.contacto,
      email: aluno.email,
      tipoDocumento: aluno.tipoDocumento,
      numeroDocumento: aluno.numeroDocumento,
      emissao: aluno.emissao,
      validade: aluno.validade,
      localEmissao: aluno.localEmissao,
      nif: aluno.nif,
      provincia: aluno.provincia,
      municipio: aluno.municipio,
      bairro: aluno.bairro,
      rua: aluno.rua,
      quarteirao: aluno.quarteirao,
      numeroPorta: aluno.numeroPorta,
      fazEducacaoFisica: aluno.fazEducacaoFisica,
      grupoSanguinio: aluno.grupoSanguinio,
      autorizaMedicamento: aluno.autorizaMedicamento,
      altura: aluno.altura,
      peso: aluno.peso,
      nomeMedico: aluno.nomeMedico,
      contactoMedico: aluno.contactoMedico,
      desmaioConstante: aluno.desmaioConstante,
      alergia: aluno.alergia,
      dificiencia: aluno.dificiencia,
      anoConclusao: aluno.anoConclusao,
      situacaoAnterior: aluno.situacaoAnterior,
      meioTransporte: aluno.meioTransporte,
      escolaAnterior: aluno.escolaAnterior,
      classeAnterior: aluno.classeAnterior,
      cursoAnterior: aluno.cursoAnterior,
      data: aluno.data != null ? aluno.data.format(DATE_TIME_FORMAT) : null,
      numeroProcesso: aluno.numeroProcesso,
      transferido: aluno.transferido,
      observacao: aluno.observacao,
      situacaoAtual: aluno.situacaoAtual,
      encarregadoId: aluno.encarregadoId
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
    const aluno = this.createFromForm();
    if (aluno.id !== undefined) {
      this.subscribeToSaveResponse(this.alunoService.update(aluno));
    } else {
      this.subscribeToSaveResponse(this.alunoService.create(aluno));
    }
  }

  private createFromForm(): IAluno {
    return {
      ...new Aluno(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      sexo: this.editForm.get(['sexo'])!.value,
      fotografiaContentType: this.editForm.get(['fotografiaContentType'])!.value,
      fotografia: this.editForm.get(['fotografia'])!.value,
      pai: this.editForm.get(['pai'])!.value,
      mae: this.editForm.get(['mae'])!.value,
      nascimento: this.editForm.get(['nascimento'])!.value,
      nacionalidade: this.editForm.get(['nacionalidade'])!.value,
      naturalidade: this.editForm.get(['naturalidade'])!.value,
      contacto: this.editForm.get(['contacto'])!.value,
      email: this.editForm.get(['email'])!.value,
      tipoDocumento: this.editForm.get(['tipoDocumento'])!.value,
      numeroDocumento: this.editForm.get(['numeroDocumento'])!.value,
      emissao: this.editForm.get(['emissao'])!.value,
      validade: this.editForm.get(['validade'])!.value,
      localEmissao: this.editForm.get(['localEmissao'])!.value,
      nif: this.editForm.get(['nif'])!.value,
      provincia: this.editForm.get(['provincia'])!.value,
      municipio: this.editForm.get(['municipio'])!.value,
      bairro: this.editForm.get(['bairro'])!.value,
      rua: this.editForm.get(['rua'])!.value,
      quarteirao: this.editForm.get(['quarteirao'])!.value,
      numeroPorta: this.editForm.get(['numeroPorta'])!.value,
      fazEducacaoFisica: this.editForm.get(['fazEducacaoFisica'])!.value,
      grupoSanguinio: this.editForm.get(['grupoSanguinio'])!.value,
      autorizaMedicamento: this.editForm.get(['autorizaMedicamento'])!.value,
      altura: this.editForm.get(['altura'])!.value,
      peso: this.editForm.get(['peso'])!.value,
      nomeMedico: this.editForm.get(['nomeMedico'])!.value,
      contactoMedico: this.editForm.get(['contactoMedico'])!.value,
      desmaioConstante: this.editForm.get(['desmaioConstante'])!.value,
      alergia: this.editForm.get(['alergia'])!.value,
      dificiencia: this.editForm.get(['dificiencia'])!.value,
      anoConclusao: this.editForm.get(['anoConclusao'])!.value,
      situacaoAnterior: this.editForm.get(['situacaoAnterior'])!.value,
      meioTransporte: this.editForm.get(['meioTransporte'])!.value,
      escolaAnterior: this.editForm.get(['escolaAnterior'])!.value,
      classeAnterior: this.editForm.get(['classeAnterior'])!.value,
      cursoAnterior: this.editForm.get(['cursoAnterior'])!.value,
      data: this.editForm.get(['data'])!.value != null ? moment(this.editForm.get(['data'])!.value, DATE_TIME_FORMAT) : undefined,
      numeroProcesso: this.editForm.get(['numeroProcesso'])!.value,
      transferido: this.editForm.get(['transferido'])!.value,
      observacao: this.editForm.get(['observacao'])!.value,
      situacaoAtual: this.editForm.get(['situacaoAtual'])!.value,
      encarregadoId: this.editForm.get(['encarregadoId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAluno>>): void {
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

  trackById(index: number, item: IEncarregadoEducao): any {
    return item.id;
  }
}
