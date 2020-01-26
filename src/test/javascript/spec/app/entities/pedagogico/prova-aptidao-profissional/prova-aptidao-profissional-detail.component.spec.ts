import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { ProvaAptidaoProfissionalDetailComponent } from 'app/entities/pedagogico/prova-aptidao-profissional/prova-aptidao-profissional-detail.component';
import { ProvaAptidaoProfissional } from 'app/shared/model/pedagogico/prova-aptidao-profissional.model';

describe('Component Tests', () => {
  describe('ProvaAptidaoProfissional Management Detail Component', () => {
    let comp: ProvaAptidaoProfissionalDetailComponent;
    let fixture: ComponentFixture<ProvaAptidaoProfissionalDetailComponent>;
    const route = ({ data: of({ provaAptidaoProfissional: new ProvaAptidaoProfissional(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [ProvaAptidaoProfissionalDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProvaAptidaoProfissionalDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProvaAptidaoProfissionalDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load provaAptidaoProfissional on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.provaAptidaoProfissional).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
