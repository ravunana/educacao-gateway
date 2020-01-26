import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { DosificacaoUpdateComponent } from 'app/entities/pedagogico/dosificacao/dosificacao-update.component';
import { DosificacaoService } from 'app/entities/pedagogico/dosificacao/dosificacao.service';
import { Dosificacao } from 'app/shared/model/pedagogico/dosificacao.model';

describe('Component Tests', () => {
  describe('Dosificacao Management Update Component', () => {
    let comp: DosificacaoUpdateComponent;
    let fixture: ComponentFixture<DosificacaoUpdateComponent>;
    let service: DosificacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [DosificacaoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DosificacaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DosificacaoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DosificacaoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Dosificacao(123);
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
        const entity = new Dosificacao();
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
