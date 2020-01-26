import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { ContaAlunoDetailComponent } from 'app/entities/pagamento/conta-aluno/conta-aluno-detail.component';
import { ContaAluno } from 'app/shared/model/pagamento/conta-aluno.model';

describe('Component Tests', () => {
  describe('ContaAluno Management Detail Component', () => {
    let comp: ContaAlunoDetailComponent;
    let fixture: ComponentFixture<ContaAlunoDetailComponent>;
    const route = ({ data: of({ contaAluno: new ContaAluno(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [ContaAlunoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ContaAlunoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContaAlunoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load contaAluno on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.contaAluno).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
