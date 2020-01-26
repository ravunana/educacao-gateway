import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { RespostaQuestaoUpdateComponent } from 'app/entities/pedagogico/resposta-questao/resposta-questao-update.component';
import { RespostaQuestaoService } from 'app/entities/pedagogico/resposta-questao/resposta-questao.service';
import { RespostaQuestao } from 'app/shared/model/pedagogico/resposta-questao.model';

describe('Component Tests', () => {
  describe('RespostaQuestao Management Update Component', () => {
    let comp: RespostaQuestaoUpdateComponent;
    let fixture: ComponentFixture<RespostaQuestaoUpdateComponent>;
    let service: RespostaQuestaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [RespostaQuestaoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RespostaQuestaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RespostaQuestaoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RespostaQuestaoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RespostaQuestao(123);
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
        const entity = new RespostaQuestao();
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
