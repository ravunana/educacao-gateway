import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { EfeitoPagamentoDetailComponent } from 'app/entities/secretaria/efeito-pagamento/efeito-pagamento-detail.component';
import { EfeitoPagamento } from 'app/shared/model/secretaria/efeito-pagamento.model';

describe('Component Tests', () => {
  describe('EfeitoPagamento Management Detail Component', () => {
    let comp: EfeitoPagamentoDetailComponent;
    let fixture: ComponentFixture<EfeitoPagamentoDetailComponent>;
    const route = ({ data: of({ efeitoPagamento: new EfeitoPagamento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [EfeitoPagamentoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EfeitoPagamentoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EfeitoPagamentoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load efeitoPagamento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.efeitoPagamento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
