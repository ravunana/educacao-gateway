import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../test.module';
import { EntidadeSistemaUpdateComponent } from 'app/entities/entidade-sistema/entidade-sistema-update.component';
import { EntidadeSistemaService } from 'app/entities/entidade-sistema/entidade-sistema.service';
import { EntidadeSistema } from 'app/shared/model/entidade-sistema.model';

describe('Component Tests', () => {
  describe('EntidadeSistema Management Update Component', () => {
    let comp: EntidadeSistemaUpdateComponent;
    let fixture: ComponentFixture<EntidadeSistemaUpdateComponent>;
    let service: EntidadeSistemaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [EntidadeSistemaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EntidadeSistemaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EntidadeSistemaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntidadeSistemaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EntidadeSistema(123);
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
        const entity = new EntidadeSistema();
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
