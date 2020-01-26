import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { EducacaoTestModule } from '../../../../test.module';
import { TesteConhecimentoComponent } from 'app/entities/pedagogico/teste-conhecimento/teste-conhecimento.component';
import { TesteConhecimentoService } from 'app/entities/pedagogico/teste-conhecimento/teste-conhecimento.service';
import { TesteConhecimento } from 'app/shared/model/pedagogico/teste-conhecimento.model';

describe('Component Tests', () => {
  describe('TesteConhecimento Management Component', () => {
    let comp: TesteConhecimentoComponent;
    let fixture: ComponentFixture<TesteConhecimentoComponent>;
    let service: TesteConhecimentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [TesteConhecimentoComponent],
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
        .overrideTemplate(TesteConhecimentoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TesteConhecimentoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TesteConhecimentoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TesteConhecimento(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.testeConhecimentos && comp.testeConhecimentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TesteConhecimento(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.testeConhecimentos && comp.testeConhecimentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
