import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { EducacaoTestModule } from '../../../../test.module';
import { DosificacaoDetailComponent } from 'app/entities/pedagogico/dosificacao/dosificacao-detail.component';
import { Dosificacao } from 'app/shared/model/pedagogico/dosificacao.model';

describe('Component Tests', () => {
  describe('Dosificacao Management Detail Component', () => {
    let comp: DosificacaoDetailComponent;
    let fixture: ComponentFixture<DosificacaoDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ dosificacao: new Dosificacao(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [DosificacaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DosificacaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DosificacaoDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load dosificacao on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dosificacao).toEqual(jasmine.objectContaining({ id: 123 }));
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
