import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { TesteConhecimentoDetailComponent } from 'app/entities/pedagogico/teste-conhecimento/teste-conhecimento-detail.component';
import { TesteConhecimento } from 'app/shared/model/pedagogico/teste-conhecimento.model';

describe('Component Tests', () => {
  describe('TesteConhecimento Management Detail Component', () => {
    let comp: TesteConhecimentoDetailComponent;
    let fixture: ComponentFixture<TesteConhecimentoDetailComponent>;
    const route = ({ data: of({ testeConhecimento: new TesteConhecimento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [TesteConhecimentoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TesteConhecimentoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TesteConhecimentoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load testeConhecimento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.testeConhecimento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
