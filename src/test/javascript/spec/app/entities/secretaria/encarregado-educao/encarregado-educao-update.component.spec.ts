import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { EncarregadoEducaoUpdateComponent } from 'app/entities/secretaria/encarregado-educao/encarregado-educao-update.component';
import { EncarregadoEducaoService } from 'app/entities/secretaria/encarregado-educao/encarregado-educao.service';
import { EncarregadoEducao } from 'app/shared/model/secretaria/encarregado-educao.model';

describe('Component Tests', () => {
  describe('EncarregadoEducao Management Update Component', () => {
    let comp: EncarregadoEducaoUpdateComponent;
    let fixture: ComponentFixture<EncarregadoEducaoUpdateComponent>;
    let service: EncarregadoEducaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [EncarregadoEducaoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EncarregadoEducaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EncarregadoEducaoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EncarregadoEducaoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EncarregadoEducao(123);
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
        const entity = new EncarregadoEducao();
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
