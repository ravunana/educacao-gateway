import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EducacaoTestModule } from '../../../../test.module';
import { MockEventManager } from '../../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../../helpers/mock-active-modal.service';
import { EncarregadoEducaoDeleteDialogComponent } from 'app/entities/secretaria/encarregado-educao/encarregado-educao-delete-dialog.component';
import { EncarregadoEducaoService } from 'app/entities/secretaria/encarregado-educao/encarregado-educao.service';

describe('Component Tests', () => {
  describe('EncarregadoEducao Management Delete Component', () => {
    let comp: EncarregadoEducaoDeleteDialogComponent;
    let fixture: ComponentFixture<EncarregadoEducaoDeleteDialogComponent>;
    let service: EncarregadoEducaoService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [EncarregadoEducaoDeleteDialogComponent]
      })
        .overrideTemplate(EncarregadoEducaoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EncarregadoEducaoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EncarregadoEducaoService);
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
