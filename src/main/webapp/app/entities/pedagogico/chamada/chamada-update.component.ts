import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IChamada, Chamada } from 'app/shared/model/pedagogico/chamada.model';
import { ChamadaService } from './chamada.service';
import { IAula } from 'app/shared/model/pedagogico/aula.model';
import { AulaService } from 'app/entities/pedagogico/aula/aula.service';

@Component({
  selector: 'rv-chamada-update',
  templateUrl: './chamada-update.component.html'
})
export class ChamadaUpdateComponent implements OnInit {
  isSaving = false;

  aulas: IAula[] = [];

  editForm = this.fb.group({
    id: [],
    data: [null, [Validators.required]],
    presente: [null, [Validators.required]],
    numeroProcesso: [],
    aulaId: [null, Validators.required]
  });

  constructor(
    protected chamadaService: ChamadaService,
    protected aulaService: AulaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chamada }) => {
      this.updateForm(chamada);

      this.aulaService
        .query()
        .pipe(
          map((res: HttpResponse<IAula[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAula[]) => (this.aulas = resBody));
    });
  }

  updateForm(chamada: IChamada): void {
    this.editForm.patchValue({
      id: chamada.id,
      data: chamada.data != null ? chamada.data.format(DATE_TIME_FORMAT) : null,
      presente: chamada.presente,
      numeroProcesso: chamada.numeroProcesso,
      aulaId: chamada.aulaId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chamada = this.createFromForm();
    if (chamada.id !== undefined) {
      this.subscribeToSaveResponse(this.chamadaService.update(chamada));
    } else {
      this.subscribeToSaveResponse(this.chamadaService.create(chamada));
    }
  }

  private createFromForm(): IChamada {
    return {
      ...new Chamada(),
      id: this.editForm.get(['id'])!.value,
      data: this.editForm.get(['data'])!.value != null ? moment(this.editForm.get(['data'])!.value, DATE_TIME_FORMAT) : undefined,
      presente: this.editForm.get(['presente'])!.value,
      numeroProcesso: this.editForm.get(['numeroProcesso'])!.value,
      aulaId: this.editForm.get(['aulaId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChamada>>): void {
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

  trackById(index: number, item: IAula): any {
    return item.id;
  }
}
