import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { ContaAlunoUpdateComponent } from 'app/entities/pagamento/conta-aluno/conta-aluno-update.component';
import { ContaAlunoService } from 'app/entities/pagamento/conta-aluno/conta-aluno.service';
import { ContaAluno } from 'app/shared/model/pagamento/conta-aluno.model';

describe('Component Tests', () => {
  describe('ContaAluno Management Update Component', () => {
    let comp: ContaAlunoUpdateComponent;
    let fixture: ComponentFixture<ContaAlunoUpdateComponent>;
    let service: ContaAlunoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [ContaAlunoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ContaAlunoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContaAlunoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContaAlunoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ContaAluno(123);
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
        const entity = new ContaAluno();
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
