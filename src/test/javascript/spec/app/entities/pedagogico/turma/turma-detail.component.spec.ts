import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { TurmaDetailComponent } from 'app/entities/pedagogico/turma/turma-detail.component';
import { Turma } from 'app/shared/model/pedagogico/turma.model';

describe('Component Tests', () => {
  describe('Turma Management Detail Component', () => {
    let comp: TurmaDetailComponent;
    let fixture: ComponentFixture<TurmaDetailComponent>;
    const route = ({ data: of({ turma: new Turma(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [TurmaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TurmaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TurmaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load turma on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.turma).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
