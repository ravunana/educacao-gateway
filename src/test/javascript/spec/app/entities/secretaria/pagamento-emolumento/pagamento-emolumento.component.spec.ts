import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { EducacaoTestModule } from '../../../../test.module';
import { PagamentoEmolumentoComponent } from 'app/entities/secretaria/pagamento-emolumento/pagamento-emolumento.component';
import { PagamentoEmolumentoService } from 'app/entities/secretaria/pagamento-emolumento/pagamento-emolumento.service';
import { PagamentoEmolumento } from 'app/shared/model/secretaria/pagamento-emolumento.model';

describe('Component Tests', () => {
  describe('PagamentoEmolumento Management Component', () => {
    let comp: PagamentoEmolumentoComponent;
    let fixture: ComponentFixture<PagamentoEmolumentoComponent>;
    let service: PagamentoEmolumentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [PagamentoEmolumentoComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) =>
                  fn({
                    pagingParams: {
                      predicate: 'id',
                      reverse: false,
                      page: 0
                    }
                  })
              }
            }
          }
        ]
      })
        .overrideTemplate(PagamentoEmolumentoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PagamentoEmolumentoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PagamentoEmolumentoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PagamentoEmolumento(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pagamentoEmolumentos && comp.pagamentoEmolumentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PagamentoEmolumento(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pagamentoEmolumentos && comp.pagamentoEmolumentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
