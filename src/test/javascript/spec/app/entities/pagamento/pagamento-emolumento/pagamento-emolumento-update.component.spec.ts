import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { PagamentoEmolumentoUpdateComponent } from 'app/entities/pagamento/pagamento-emolumento/pagamento-emolumento-update.component';
import { PagamentoEmolumentoService } from 'app/entities/pagamento/pagamento-emolumento/pagamento-emolumento.service';
import { PagamentoEmolumento } from 'app/shared/model/pagamento/pagamento-emolumento.model';

describe('Component Tests', () => {
  describe('PagamentoEmolumento Management Update Component', () => {
    let comp: PagamentoEmolumentoUpdateComponent;
    let fixture: ComponentFixture<PagamentoEmolumentoUpdateComponent>;
    let service: PagamentoEmolumentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [PagamentoEmolumentoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PagamentoEmolumentoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PagamentoEmolumentoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PagamentoEmolumentoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PagamentoEmolumento(123);
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
        const entity = new PagamentoEmolumento();
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
