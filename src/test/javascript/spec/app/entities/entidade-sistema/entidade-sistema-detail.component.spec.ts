import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EducacaoTestModule } from '../../../test.module';
import { EntidadeSistemaDetailComponent } from 'app/entities/entidade-sistema/entidade-sistema-detail.component';
import { EntidadeSistema } from 'app/shared/model/entidade-sistema.model';

describe('Component Tests', () => {
  describe('EntidadeSistema Management Detail Component', () => {
    let comp: EntidadeSistemaDetailComponent;
    let fixture: ComponentFixture<EntidadeSistemaDetailComponent>;
    const route = ({ data: of({ entidadeSistema: new EntidadeSistema(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [EntidadeSistemaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EntidadeSistemaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EntidadeSistemaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load entidadeSistema on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.entidadeSistema).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
