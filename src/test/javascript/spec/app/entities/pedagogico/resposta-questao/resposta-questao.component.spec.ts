import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { EducacaoTestModule } from '../../../../test.module';
import { RespostaQuestaoComponent } from 'app/entities/pedagogico/resposta-questao/resposta-questao.component';
import { RespostaQuestaoService } from 'app/entities/pedagogico/resposta-questao/resposta-questao.service';
import { RespostaQuestao } from 'app/shared/model/pedagogico/resposta-questao.model';

describe('Component Tests', () => {
  describe('RespostaQuestao Management Component', () => {
    let comp: RespostaQuestaoComponent;
    let fixture: ComponentFixture<RespostaQuestaoComponent>;
    let service: RespostaQuestaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [RespostaQuestaoComponent],
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
        .overrideTemplate(RespostaQuestaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RespostaQuestaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RespostaQuestaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RespostaQuestao(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.respostaQuestaos && comp.respostaQuestaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RespostaQuestao(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.respostaQuestaos && comp.respostaQuestaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
