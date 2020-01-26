import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../../test.module';
import { AulaDetailComponent } from 'app/entities/pedagogico/aula/aula-detail.component';
import { Aula } from 'app/shared/model/pedagogico/aula.model';

describe('Component Tests', () => {
  describe('Aula Management Detail Component', () => {
    let comp: AulaDetailComponent;
    let fixture: ComponentFixture<AulaDetailComponent>;
    const route = ({ data: of({ aula: new Aula(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [AulaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AulaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AulaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load aula on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.aula).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
