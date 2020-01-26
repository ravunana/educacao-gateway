import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { EducacaoTestModule } from '../../../test.module';
import { LookupDetailComponent } from 'app/entities/lookup/lookup-detail.component';
import { Lookup } from 'app/shared/model/lookup.model';

describe('Component Tests', () => {
  describe('Lookup Management Detail Component', () => {
    let comp: LookupDetailComponent;
    let fixture: ComponentFixture<LookupDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ lookup: new Lookup(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [LookupDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LookupDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LookupDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load lookup on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.lookup).toEqual(jasmine.objectContaining({ id: 123 }));
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
