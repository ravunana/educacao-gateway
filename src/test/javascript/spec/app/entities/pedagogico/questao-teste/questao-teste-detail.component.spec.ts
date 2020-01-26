import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { QuestaoTesteDetailComponent } from 'app/entities/pedagogico/questao-teste/questao-teste-detail.component';
import { QuestaoTeste } from 'app/shared/model/pedagogico/questao-teste.model';

describe('Component Tests', () => {
  describe('QuestaoTeste Management Detail Component', () => {
    let comp: QuestaoTesteDetailComponent;
    let fixture: ComponentFixture<QuestaoTesteDetailComponent>;
    const route = ({ data: of({ questaoTeste: new QuestaoTeste(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [QuestaoTesteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(QuestaoTesteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(QuestaoTesteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load questaoTeste on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.questaoTeste).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
