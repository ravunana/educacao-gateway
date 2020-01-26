import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IDosificacao, Dosificacao } from 'app/shared/model/pedagogico/dosificacao.model';
import { DosificacaoService } from './dosificacao.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ICurso } from 'app/shared/model/pedagogico/curso.model';
import { CursoService } from 'app/entities/pedagogico/curso/curso.service';
import { IPlanoCurricular } from 'app/shared/model/pedagogico/plano-curricular.model';
import { PlanoCurricularService } from 'app/entities/pedagogico/plano-curricular/plano-curricular.service';

type SelectableEntity = ICurso | IPlanoCurricular;

@Component({
  selector: 'rv-dosificacao-update',
  templateUrl: './dosificacao-update.component.html'
})
export class DosificacaoUpdateComponent implements OnInit {
  isSaving = false;

  cursos: ICurso[] = [];

  planocurriculars: IPlanoCurricular[] = [];
  deDp: any;
  ateDp: any;

  editForm = this.fb.group({
    id: [],
    peridoLective: [null, [Validators.required]],
    objectivoGeral: [null, [Validators.required]],
    semanaLectiva: [null, [Validators.required]],
    de: [null, [Validators.required]],
    ate: [null, [Validators.required]],
    unidadeTematica: [null, [Validators.required]],
    conteudo: [null, [Validators.required]],
    procedimentoEnsino: [null, [Validators.required]],
    recursosDidaticos: [null, [Validators.required]],
    tempoAula: [null, [Validators.required]],
    formaAvaliacao: [null, [Validators.required]],
    cursos: [null, Validators.required],
    curriuloId: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected dosificacaoService: DosificacaoService,
    protected cursoService: CursoService,
    protected planoCurricularService: PlanoCurricularService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dosificacao }) => {
      this.updateForm(dosificacao);

      this.cursoService
        .query()
        .pipe(
          map((res: HttpResponse<ICurso[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICurso[]) => (this.cursos = resBody));

      this.planoCurricularService
        .query()
        .pipe(
          map((res: HttpResponse<IPlanoCurricular[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IPlanoCurricular[]) => (this.planocurriculars = resBody));
    });
  }

  updateForm(dosificacao: IDosificacao): void {
    this.editForm.patchValue({
      id: dosificacao.id,
      peridoLective: dosificacao.peridoLective,
      objectivoGeral: dosificacao.objectivoGeral,
      semanaLectiva: dosificacao.semanaLectiva,
      de: dosificacao.de,
      ate: dosificacao.ate,
      unidadeTematica: dosificacao.unidadeTematica,
      conteudo: dosificacao.conteudo,
      procedimentoEnsino: dosificacao.procedimentoEnsino,
      recursosDidaticos: dosificacao.recursosDidaticos,
      tempoAula: dosificacao.tempoAula,
      formaAvaliacao: dosificacao.formaAvaliacao,
      cursos: dosificacao.cursos,
      curriuloId: dosificacao.curriuloId
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
    const dosificacao = this.createFromForm();
    if (dosificacao.id !== undefined) {
      this.subscribeToSaveResponse(this.dosificacaoService.update(dosificacao));
    } else {
      this.subscribeToSaveResponse(this.dosificacaoService.create(dosificacao));
    }
  }

  private createFromForm(): IDosificacao {
    return {
      ...new Dosificacao(),
      id: this.editForm.get(['id'])!.value,
      peridoLective: this.editForm.get(['peridoLective'])!.value,
      objectivoGeral: this.editForm.get(['objectivoGeral'])!.value,
      semanaLectiva: this.editForm.get(['semanaLectiva'])!.value,
      de: this.editForm.get(['de'])!.value,
      ate: this.editForm.get(['ate'])!.value,
      unidadeTematica: this.editForm.get(['unidadeTematica'])!.value,
      conteudo: this.editForm.get(['conteudo'])!.value,
      procedimentoEnsino: this.editForm.get(['procedimentoEnsino'])!.value,
      recursosDidaticos: this.editForm.get(['recursosDidaticos'])!.value,
      tempoAula: this.editForm.get(['tempoAula'])!.value,
      formaAvaliacao: this.editForm.get(['formaAvaliacao'])!.value,
      cursos: this.editForm.get(['cursos'])!.value,
      curriuloId: this.editForm.get(['curriuloId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDosificacao>>): void {
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

  getSelected(selectedVals: ICurso[], option: ICurso): ICurso {
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
