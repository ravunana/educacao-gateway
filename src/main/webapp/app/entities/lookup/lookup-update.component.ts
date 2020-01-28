import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ILookup, Lookup } from 'app/shared/model/lookup.model';
import { LookupService } from './lookup.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IEntidadeSistema } from 'app/shared/model/entidade-sistema.model';
import { EntidadeSistemaService } from 'app/entities/entidade-sistema/entidade-sistema.service';

@Component({
  selector: 'rv-lookup-update',
  templateUrl: './lookup-update.component.html'
})
export class LookupUpdateComponent implements OnInit {
  isSaving = false;

  entidadesistemas: IEntidadeSistema[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    sigla: [null, [Validators.required]],
    descricao: [],
    usuario: [],
    entidadeId: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected lookupService: LookupService,
    protected entidadeSistemaService: EntidadeSistemaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lookup }) => {
      this.updateForm(lookup);

      this.entidadeSistemaService
        .query()
        .pipe(
          map((res: HttpResponse<IEntidadeSistema[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IEntidadeSistema[]) => (this.entidadesistemas = resBody));
    });
  }

  updateForm(lookup: ILookup): void {
    this.editForm.patchValue({
      id: lookup.id,
      nome: lookup.nome,
      sigla: lookup.sigla,
      descricao: lookup.descricao,
      usuario: lookup.usuario,
      entidadeId: lookup.entidadeId
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
    const lookup = this.createFromForm();
    if (lookup.id !== undefined) {
      this.subscribeToSaveResponse(this.lookupService.update(lookup));
    } else {
      this.subscribeToSaveResponse(this.lookupService.create(lookup));
    }
  }

  private createFromForm(): ILookup {
    return {
      ...new Lookup(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      sigla: this.editForm.get(['sigla'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      usuario: this.editForm.get(['usuario'])!.value,
      entidadeId: this.editForm.get(['entidadeId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILookup>>): void {
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

  trackById(index: number, item: IEntidadeSistema): any {
    return item.id;
  }

  onSelectPessoa(event: any): void {
    alert(event.query);
    // this.clienteService.query({ 'pessoaId.equals': pessoa.id }).subscribe(clienteResult => {
    //   this.clienteId = clienteResult.body.shift().id;
    //   // this.editForm.get('fornecedorId').patchValue(fornecedorId, { emitEvent: false });
    // });
  }

  searchPessoa(event: any) {
    this.entidadeSistemaService.query({ 'nome.contains': event.query }).subscribe(data => {
      this.entidadesistemas = data.body ? this.entidadesistemas : [];
    });
  }
}
