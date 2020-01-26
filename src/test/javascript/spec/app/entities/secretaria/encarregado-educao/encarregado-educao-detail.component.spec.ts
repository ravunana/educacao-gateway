import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { EncarregadoEducaoDetailComponent } from 'app/entities/secretaria/encarregado-educao/encarregado-educao-detail.component';
import { EncarregadoEducao } from 'app/shared/model/secretaria/encarregado-educao.model';

describe('Component Tests', () => {
  describe('EncarregadoEducao Management Detail Component', () => {
    let comp: EncarregadoEducaoDetailComponent;
    let fixture: ComponentFixture<EncarregadoEducaoDetailComponent>;
    const route = ({ data: of({ encarregadoEducao: new EncarregadoEducao(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [EncarregadoEducaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EncarregadoEducaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EncarregadoEducaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load encarregadoEducao on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.encarregadoEducao).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
