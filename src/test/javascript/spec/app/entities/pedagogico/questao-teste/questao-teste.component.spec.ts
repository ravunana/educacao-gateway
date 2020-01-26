import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { EducacaoTestModule } from '../../../../test.module';
import { QuestaoTesteComponent } from 'app/entities/pedagogico/questao-teste/questao-teste.component';
import { QuestaoTesteService } from 'app/entities/pedagogico/questao-teste/questao-teste.service';
import { QuestaoTeste } from 'app/shared/model/pedagogico/questao-teste.model';

describe('Component Tests', () => {
  describe('QuestaoTeste Management Component', () => {
    let comp: QuestaoTesteComponent;
    let fixture: ComponentFixture<QuestaoTesteComponent>;
    let service: QuestaoTesteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [QuestaoTesteComponent],
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
        .overrideTemplate(QuestaoTesteComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(QuestaoTesteComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QuestaoTesteService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new QuestaoTeste(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.questaoTestes && comp.questaoTestes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new QuestaoTeste(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.questaoTestes && comp.questaoTestes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
