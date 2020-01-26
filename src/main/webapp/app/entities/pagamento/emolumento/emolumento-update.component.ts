import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEmolumento, Emolumento } from 'app/shared/model/pagamento/emolumento.model';
import { EmolumentoService } from './emolumento.service';

@Component({
  selector: 'rv-emolumento-update',
  templateUrl: './emolumento-update.component.html'
})
export class EmolumentoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    montante: [null, [Validators.required, Validators.min(0)]],
    montanteMulta: [null, [Validators.required, Validators.min(0)]],
    tempoMulta: [null, [Validators.required, Validators.min(0)]],
    quantidade: [null, [Validators.min(0)]],
    turno: [],
    classe: [],
    curso: []
  });

  constructor(protected emolumentoService: EmolumentoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ emolumento }) => {
      this.updateForm(emolumento);
    });
  }

  updateForm(emolumento: IEmolumento): void {
    this.editForm.patchValue({
      id: emolumento.id,
      nome: emolumento.nome,
      montante: emolumento.montante,
      montanteMulta: emolumento.montanteMulta,
      tempoMulta: emolumento.tempoMulta,
      quantidade: emolumento.quantidade,
      turno: emolumento.turno,
      classe: emolumento.classe,
      curso: emolumento.curso
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const emolumento = this.createFromForm();
    if (emolumento.id !== undefined) {
      this.subscribeToSaveResponse(this.emolumentoService.update(emolumento));
    } else {
      this.subscribeToSaveResponse(this.emolumentoService.create(emolumento));
    }
  }

  private createFromForm(): IEmolumento {
    return {
      ...new Emolumento(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      montante: this.editForm.get(['montante'])!.value,
      montanteMulta: this.editForm.get(['montanteMulta'])!.value,
      tempoMulta: this.editForm.get(['tempoMulta'])!.value,
      quantidade: this.editForm.get(['quantidade'])!.value,
      turno: this.editForm.get(['turno'])!.value,
      classe: this.editForm.get(['classe'])!.value,
      curso: this.editForm.get(['curso'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmolumento>>): void {
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
