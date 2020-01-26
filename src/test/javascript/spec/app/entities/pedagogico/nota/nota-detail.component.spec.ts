import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { EducacaoTestModule } from '../../../../test.module';
import { NotaDetailComponent } from 'app/entities/pedagogico/nota/nota-detail.component';
import { Nota } from 'app/shared/model/pedagogico/nota.model';

describe('Component Tests', () => {
  describe('Nota Management Detail Component', () => {
    let comp: NotaDetailComponent;
    let fixture: ComponentFixture<NotaDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ nota: new Nota(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [NotaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NotaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NotaDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load nota on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.nota).toEqual(jasmine.objectContaining({ id: 123 }));
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
