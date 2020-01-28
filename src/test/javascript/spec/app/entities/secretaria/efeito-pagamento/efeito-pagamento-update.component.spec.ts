import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { EfeitoPagamentoUpdateComponent } from 'app/entities/secretaria/efeito-pagamento/efeito-pagamento-update.component';
import { EfeitoPagamentoService } from 'app/entities/secretaria/efeito-pagamento/efeito-pagamento.service';
import { EfeitoPagamento } from 'app/shared/model/secretaria/efeito-pagamento.model';

describe('Component Tests', () => {
  describe('EfeitoPagamento Management Update Component', () => {
    let comp: EfeitoPagamentoUpdateComponent;
    let fixture: ComponentFixture<EfeitoPagamentoUpdateComponent>;
    let service: EfeitoPagamentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [EfeitoPagamentoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EfeitoPagamentoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EfeitoPagamentoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EfeitoPagamentoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EfeitoPagamento(123);
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
        const entity = new EfeitoPagamento();
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
