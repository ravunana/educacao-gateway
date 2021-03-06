import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { EducacaoTestModule } from '../../../../test.module';
import { PlanoAulaDetailComponent } from 'app/entities/secretaria/plano-aula/plano-aula-detail.component';
import { PlanoAula } from 'app/shared/model/secretaria/plano-aula.model';

describe('Component Tests', () => {
  describe('PlanoAula Management Detail Component', () => {
    let comp: PlanoAulaDetailComponent;
    let fixture: ComponentFixture<PlanoAulaDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ planoAula: new PlanoAula(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [PlanoAulaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlanoAulaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlanoAulaDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load planoAula on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.planoAula).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
