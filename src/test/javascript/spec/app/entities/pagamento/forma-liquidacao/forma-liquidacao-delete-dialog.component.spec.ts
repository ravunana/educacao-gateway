import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EducacaoTestModule } from '../../../../test.module';
import { MockEventManager } from '../../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../../helpers/mock-active-modal.service';
import { FormaLiquidacaoDeleteDialogComponent } from 'app/entities/pagamento/forma-liquidacao/forma-liquidacao-delete-dialog.component';
import { FormaLiquidacaoService } from 'app/entities/pagamento/forma-liquidacao/forma-liquidacao.service';

describe('Component Tests', () => {
  describe('FormaLiquidacao Management Delete Component', () => {
    let comp: FormaLiquidacaoDeleteDialogComponent;
    let fixture: ComponentFixture<FormaLiquidacaoDeleteDialogComponent>;
    let service: FormaLiquidacaoService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [FormaLiquidacaoDeleteDialogComponent]
      })
        .overrideTemplate(FormaLiquidacaoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FormaLiquidacaoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormaLiquidacaoService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.clear();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
