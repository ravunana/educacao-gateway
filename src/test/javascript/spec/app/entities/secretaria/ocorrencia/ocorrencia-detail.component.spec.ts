import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { EducacaoTestModule } from '../../../../test.module';
import { OcorrenciaDetailComponent } from 'app/entities/secretaria/ocorrencia/ocorrencia-detail.component';
import { Ocorrencia } from 'app/shared/model/secretaria/ocorrencia.model';

describe('Component Tests', () => {
  describe('Ocorrencia Management Detail Component', () => {
    let comp: OcorrenciaDetailComponent;
    let fixture: ComponentFixture<OcorrenciaDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ ocorrencia: new Ocorrencia(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [OcorrenciaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OcorrenciaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OcorrenciaDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load ocorrencia on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ocorrencia).toEqual(jasmine.objectContaining({ id: 123 }));
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
