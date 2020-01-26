import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { QuestaoTesteUpdateComponent } from 'app/entities/pedagogico/questao-teste/questao-teste-update.component';
import { QuestaoTesteService } from 'app/entities/pedagogico/questao-teste/questao-teste.service';
import { QuestaoTeste } from 'app/shared/model/pedagogico/questao-teste.model';

describe('Component Tests', () => {
  describe('QuestaoTeste Management Update Component', () => {
    let comp: QuestaoTesteUpdateComponent;
    let fixture: ComponentFixture<QuestaoTesteUpdateComponent>;
    let service: QuestaoTesteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [QuestaoTesteUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(QuestaoTesteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(QuestaoTesteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QuestaoTesteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new QuestaoTeste(123);
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
        const entity = new QuestaoTeste();
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
