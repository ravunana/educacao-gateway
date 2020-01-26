import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { ProvaAptidaoProfissionalUpdateComponent } from 'app/entities/pedagogico/prova-aptidao-profissional/prova-aptidao-profissional-update.component';
import { ProvaAptidaoProfissionalService } from 'app/entities/pedagogico/prova-aptidao-profissional/prova-aptidao-profissional.service';
import { ProvaAptidaoProfissional } from 'app/shared/model/pedagogico/prova-aptidao-profissional.model';

describe('Component Tests', () => {
  describe('ProvaAptidaoProfissional Management Update Component', () => {
    let comp: ProvaAptidaoProfissionalUpdateComponent;
    let fixture: ComponentFixture<ProvaAptidaoProfissionalUpdateComponent>;
    let service: ProvaAptidaoProfissionalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [ProvaAptidaoProfissionalUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProvaAptidaoProfissionalUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProvaAptidaoProfissionalUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProvaAptidaoProfissionalService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProvaAptidaoProfissional(123);
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
        const entity = new ProvaAptidaoProfissional();
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
