import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { EducacaoTestModule } from '../../../../test.module';
import { DepositoDetailComponent } from 'app/entities/secretaria/deposito/deposito-detail.component';
import { Deposito } from 'app/shared/model/secretaria/deposito.model';

describe('Component Tests', () => {
  describe('Deposito Management Detail Component', () => {
    let comp: DepositoDetailComponent;
    let fixture: ComponentFixture<DepositoDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ deposito: new Deposito(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EducacaoTestModule],
        declarations: [DepositoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DepositoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DepositoDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load deposito on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.deposito).toEqual(jasmine.objectContaining({ id: 123 }));
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
