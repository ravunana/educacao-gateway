import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { EducacaoTestModule } from '../../../../test.module';
import { ProvaAptidaoProfissionalComponent } from 'app/entities/pedagogico/prova-aptidao-profissional/prova-aptidao-profissional.component';
import { ProvaAptidaoProfissionalService } from 'app/entities/pedagogico/prova-aptidao-profissional/prova-aptidao-profissional.service';
import { ProvaAptidaoProfissional } from 'app/shared/model/pedagogico/prova-aptidao-profissional.model';

describe('Component Tests', () => {
  describe('ProvaAptidaoProfissional Management Component', () => {
    let comp: ProvaAptidaoProfissionalComponent;
    let fixture: ComponentFixture<ProvaAptidaoProfissionalComponent>;
    let service: ProvaAptidaoProfissionalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [ProvaAptidaoProfissionalComponent],
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
        .overrideTemplate(ProvaAptidaoProfissionalComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProvaAptidaoProfissionalComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProvaAptidaoProfissionalService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProvaAptidaoProfissional(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.provaAptidaoProfissionals && comp.provaAptidaoProfissionals[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProvaAptidaoProfissional(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.provaAptidaoProfissionals && comp.provaAptidaoProfissionals[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
