import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { PagamentoEmolumentoDetailComponent } from 'app/entities/secretaria/pagamento-emolumento/pagamento-emolumento-detail.component';
import { PagamentoEmolumento } from 'app/shared/model/secretaria/pagamento-emolumento.model';

describe('Component Tests', () => {
  describe('PagamentoEmolumento Management Detail Component', () => {
    let comp: PagamentoEmolumentoDetailComponent;
    let fixture: ComponentFixture<PagamentoEmolumentoDetailComponent>;
    const route = ({ data: of({ pagamentoEmolumento: new PagamentoEmolumento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [PagamentoEmolumentoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PagamentoEmolumentoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PagamentoEmolumentoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pagamentoEmolumento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pagamentoEmolumento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
