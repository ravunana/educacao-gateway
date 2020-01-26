import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { RespostaQuestaoDetailComponent } from 'app/entities/pedagogico/resposta-questao/resposta-questao-detail.component';
import { RespostaQuestao } from 'app/shared/model/pedagogico/resposta-questao.model';

describe('Component Tests', () => {
  describe('RespostaQuestao Management Detail Component', () => {
    let comp: RespostaQuestaoDetailComponent;
    let fixture: ComponentFixture<RespostaQuestaoDetailComponent>;
    const route = ({ data: of({ respostaQuestao: new RespostaQuestao(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [RespostaQuestaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RespostaQuestaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RespostaQuestaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load respostaQuestao on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.respostaQuestao).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
