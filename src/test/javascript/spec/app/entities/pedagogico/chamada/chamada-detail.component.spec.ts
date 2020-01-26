import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { ChamadaDetailComponent } from 'app/entities/pedagogico/chamada/chamada-detail.component';
import { Chamada } from 'app/shared/model/pedagogico/chamada.model';

describe('Component Tests', () => {
  describe('Chamada Management Detail Component', () => {
    let comp: ChamadaDetailComponent;
    let fixture: ComponentFixture<ChamadaDetailComponent>;
    const route = ({ data: of({ chamada: new Chamada(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [ChamadaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ChamadaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChamadaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load chamada on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.chamada).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
