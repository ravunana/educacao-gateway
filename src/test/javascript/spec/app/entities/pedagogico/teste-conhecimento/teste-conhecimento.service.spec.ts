import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { TesteConhecimentoService } from 'app/entities/pedagogico/teste-conhecimento/teste-conhecimento.service';
import { ITesteConhecimento, TesteConhecimento } from 'app/shared/model/pedagogico/teste-conhecimento.model';

describe('Service Tests', () => {
  describe('TesteConhecimento Service', () => {
    let injector: TestBed;
    let service: TesteConhecimentoService;
    let httpMock: HttpTestingController;
    let elemDefault: ITesteConhecimento;
    let expectedResult: ITesteConhecimento | ITesteConhecimento[] | boolean | null;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TesteConhecimentoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new TesteConhecimento(0, 'AAAAAAA', 'AAAAAAA', 0, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            data: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TesteConhecimento', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            data: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            data: currentDate
          },
          returnedFromService
        );
        service
          .create(new TesteConhecimento())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TesteConhecimento', () => {
        const returnedFromService = Object.assign(
          {
            categoria: 'BBBBBB',
            periodoLectivo: 'BBBBBB',
            duracao: 1,
            data: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            data: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TesteConhecimento', () => {
        const returnedFromService = Object.assign(
          {
            categoria: 'BBBBBB',
            periodoLectivo: 'BBBBBB',
            duracao: 1,
            data: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            data: currentDate
          },
          returnedFromService
        );
        service
          .query()
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TesteConhecimento', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
