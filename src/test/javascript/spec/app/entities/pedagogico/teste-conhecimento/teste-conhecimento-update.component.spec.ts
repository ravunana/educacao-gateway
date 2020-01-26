import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { TesteConhecimentoUpdateComponent } from 'app/entities/pedagogico/teste-conhecimento/teste-conhecimento-update.component';
import { TesteConhecimentoService } from 'app/entities/pedagogico/teste-conhecimento/teste-conhecimento.service';
import { TesteConhecimento } from 'app/shared/model/pedagogico/teste-conhecimento.model';

describe('Component Tests', () => {
  describe('TesteConhecimento Management Update Component', () => {
    let comp: TesteConhecimentoUpdateComponent;
    let fixture: ComponentFixture<TesteConhecimentoUpdateComponent>;
    let service: TesteConhecimentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [TesteConhecimentoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TesteConhecimentoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TesteConhecimentoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TesteConhecimentoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TesteConhecimento(123);
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
        const entity = new TesteConhecimento();
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
