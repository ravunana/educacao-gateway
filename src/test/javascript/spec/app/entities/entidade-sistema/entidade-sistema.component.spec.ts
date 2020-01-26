import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { EducacaoTestModule } from '../../../test.module';
import { EntidadeSistemaComponent } from 'app/entities/entidade-sistema/entidade-sistema.component';
import { EntidadeSistemaService } from 'app/entities/entidade-sistema/entidade-sistema.service';
import { EntidadeSistema } from 'app/shared/model/entidade-sistema.model';

describe('Component Tests', () => {
  describe('EntidadeSistema Management Component', () => {
    let comp: EntidadeSistemaComponent;
    let fixture: ComponentFixture<EntidadeSistemaComponent>;
    let service: EntidadeSistemaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [EntidadeSistemaComponent],
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
        .overrideTemplate(EntidadeSistemaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EntidadeSistemaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntidadeSistemaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EntidadeSistema(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.entidadeSistemas && comp.entidadeSistemas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EntidadeSistema(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.entidadeSistemas && comp.entidadeSistemas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
