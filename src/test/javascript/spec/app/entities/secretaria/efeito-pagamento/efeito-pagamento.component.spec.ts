import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { EducacaoTestModule } from '../../../../test.module';
import { EfeitoPagamentoComponent } from 'app/entities/secretaria/efeito-pagamento/efeito-pagamento.component';
import { EfeitoPagamentoService } from 'app/entities/secretaria/efeito-pagamento/efeito-pagamento.service';
import { EfeitoPagamento } from 'app/shared/model/secretaria/efeito-pagamento.model';

describe('Component Tests', () => {
  describe('EfeitoPagamento Management Component', () => {
    let comp: EfeitoPagamentoComponent;
    let fixture: ComponentFixture<EfeitoPagamentoComponent>;
    let service: EfeitoPagamentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [EfeitoPagamentoComponent],
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
        .overrideTemplate(EfeitoPagamentoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EfeitoPagamentoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EfeitoPagamentoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EfeitoPagamento(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.efeitoPagamentos && comp.efeitoPagamentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EfeitoPagamento(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.efeitoPagamentos && comp.efeitoPagamentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
