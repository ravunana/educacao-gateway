import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../test.module';
import { ContactoInstituicaoUpdateComponent } from 'app/entities/contacto-instituicao/contacto-instituicao-update.component';
import { ContactoInstituicaoService } from 'app/entities/contacto-instituicao/contacto-instituicao.service';
import { ContactoInstituicao } from 'app/shared/model/contacto-instituicao.model';

describe('Component Tests', () => {
  describe('ContactoInstituicao Management Update Component', () => {
    let comp: ContactoInstituicaoUpdateComponent;
    let fixture: ComponentFixture<ContactoInstituicaoUpdateComponent>;
    let service: ContactoInstituicaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [ContactoInstituicaoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ContactoInstituicaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContactoInstituicaoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContactoInstituicaoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ContactoInstituicao(123);
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
        const entity = new ContactoInstituicao();
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
