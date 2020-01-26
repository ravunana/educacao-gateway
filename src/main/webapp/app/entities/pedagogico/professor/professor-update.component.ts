import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProfessor, Professor } from 'app/shared/model/pedagogico/professor.model';
import { ProfessorService } from './professor.service';

@Component({
  selector: 'rv-professor-update',
  templateUrl: './professor-update.component.html'
})
export class ProfessorUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    sexo: [null, [Validators.required]],
    fotografia: [],
    contacto: [null, [Validators.required]],
    email: [null, []],
    residencia: [null, [Validators.required]],
    numeroAgente: [null, [Validators.required]],
    utilizadorId: [],
    ativo: []
  });

  constructor(protected professorService: ProfessorService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ professor }) => {
      this.updateForm(professor);
    });
  }

  updateForm(professor: IProfessor): void {
    this.editForm.patchValue({
      id: professor.id,
      nome: professor.nome,
      sexo: professor.sexo,
      fotografia: professor.fotografia,
      contacto: professor.contacto,
      email: professor.email,
      residencia: professor.residencia,
      numeroAgente: professor.numeroAgente,
      utilizadorId: professor.utilizadorId,
      ativo: professor.ativo
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const professor = this.createFromForm();
    if (professor.id !== undefined) {
      this.subscribeToSaveResponse(this.professorService.update(professor));
    } else {
      this.subscribeToSaveResponse(this.professorService.create(professor));
    }
  }

  private createFromForm(): IProfessor {
    return {
      ...new Professor(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      sexo: this.editForm.get(['sexo'])!.value,
      fotografia: this.editForm.get(['fotografia'])!.value,
      contacto: this.editForm.get(['contacto'])!.value,
      email: this.editForm.get(['email'])!.value,
      residencia: this.editForm.get(['residencia'])!.value,
      numeroAgente: this.editForm.get(['numeroAgente'])!.value,
      utilizadorId: this.editForm.get(['utilizadorId'])!.value,
      ativo: this.editForm.get(['ativo'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfessor>>): void {
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
