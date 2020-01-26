import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EducacaoTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { ContactoInstituicaoDeleteDialogComponent } from 'app/entities/contacto-instituicao/contacto-instituicao-delete-dialog.component';
import { ContactoInstituicaoService } from 'app/entities/contacto-instituicao/contacto-instituicao.service';

describe('Component Tests', () => {
  describe('ContactoInstituicao Management Delete Component', () => {
    let comp: ContactoInstituicaoDeleteDialogComponent;
    let fixture: ComponentFixture<ContactoInstituicaoDeleteDialogComponent>;
    let service: ContactoInstituicaoService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [ContactoInstituicaoDeleteDialogComponent]
      })
        .overrideTemplate(ContactoInstituicaoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContactoInstituicaoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContactoInstituicaoService);
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
