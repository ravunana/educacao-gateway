import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { HorarioDetailComponent } from 'app/entities/secretaria/horario/horario-detail.component';
import { Horario } from 'app/shared/model/secretaria/horario.model';

describe('Component Tests', () => {
  describe('Horario Management Detail Component', () => {
    let comp: HorarioDetailComponent;
    let fixture: ComponentFixture<HorarioDetailComponent>;
    const route = ({ data: of({ horario: new Horario(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [HorarioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(HorarioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HorarioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load horario on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.horario).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});