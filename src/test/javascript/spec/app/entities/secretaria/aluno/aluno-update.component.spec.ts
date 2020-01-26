import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { AlunoUpdateComponent } from 'app/entities/secretaria/aluno/aluno-update.component';
import { AlunoService } from 'app/entities/secretaria/aluno/aluno.service';
import { Aluno } from 'app/shared/model/secretaria/aluno.model';

describe('Component Tests', () => {
  describe('Aluno Management Update Component', () => {
    let comp: AlunoUpdateComponent;
    let fixture: ComponentFixture<AlunoUpdateComponent>;
    let service: AlunoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [AlunoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AlunoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AlunoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AlunoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Aluno(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Aluno();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
