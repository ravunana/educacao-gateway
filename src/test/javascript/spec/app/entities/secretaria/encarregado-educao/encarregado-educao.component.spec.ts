import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { EducacaoTestModule } from '../../../../test.module';
import { EncarregadoEducaoComponent } from 'app/entities/secretaria/encarregado-educao/encarregado-educao.component';
import { EncarregadoEducaoService } from 'app/entities/secretaria/encarregado-educao/encarregado-educao.service';
import { EncarregadoEducao } from 'app/shared/model/secretaria/encarregado-educao.model';

describe('Component Tests', () => {
  describe('EncarregadoEducao Management Component', () => {
    let comp: EncarregadoEducaoComponent;
    let fixture: ComponentFixture<EncarregadoEducaoComponent>;
    let service: EncarregadoEducaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [EncarregadoEducaoComponent],
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
        .overrideTemplate(EncarregadoEducaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EncarregadoEducaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EncarregadoEducaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EncarregadoEducao(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.encarregadoEducaos && comp.encarregadoEducaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EncarregadoEducao(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.encarregadoEducaos && comp.encarregadoEducaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
