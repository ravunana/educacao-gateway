import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { CaixaDetailComponent } from 'app/entities/pagamento/caixa/caixa-detail.component';
import { Caixa } from 'app/shared/model/pagamento/caixa.model';

describe('Component Tests', () => {
  describe('Caixa Management Detail Component', () => {
    let comp: CaixaDetailComponent;
    let fixture: ComponentFixture<CaixaDetailComponent>;
    const route = ({ data: of({ caixa: new Caixa(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [CaixaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CaixaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CaixaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load caixa on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.caixa).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
