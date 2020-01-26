import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { CaixaUpdateComponent } from 'app/entities/pagamento/caixa/caixa-update.component';
import { CaixaService } from 'app/entities/pagamento/caixa/caixa.service';
import { Caixa } from 'app/shared/model/pagamento/caixa.model';

describe('Component Tests', () => {
  describe('Caixa Management Update Component', () => {
    let comp: CaixaUpdateComponent;
    let fixture: ComponentFixture<CaixaUpdateComponent>;
    let service: CaixaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [CaixaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CaixaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CaixaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CaixaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Caixa(123);
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
        const entity = new Caixa();
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
