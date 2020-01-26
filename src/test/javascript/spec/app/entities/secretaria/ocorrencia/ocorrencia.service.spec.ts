import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { OcorrenciaService } from 'app/entities/secretaria/ocorrencia/ocorrencia.service';
import { IOcorrencia, Ocorrencia } from 'app/shared/model/secretaria/ocorrencia.model';

describe('Service Tests', () => {
  describe('Ocorrencia Service', () => {
    let injector: TestBed;
    let service: OcorrenciaService;
    let httpMock: HttpTestingController;
    let elemDefault: IOcorrencia;
    let expectedResult: IOcorrencia | IOcorrencia[] | boolean | null;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(OcorrenciaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Ocorrencia(0, 'AAAAAAA', currentDate, 'AAAAAAA', false, currentDate, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            data: currentDate.format(DATE_TIME_FORMAT),
            de: currentDate.format(DATE_FORMAT),
            ate: currentDate.format(DATE_FORMAT)
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

      it('should create a Ocorrencia', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            data: currentDate.format(DATE_TIME_FORMAT),
            de: currentDate.format(DATE_FORMAT),
            ate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            data: currentDate,
            de: currentDate,
            ate: currentDate
          },
          returnedFromService
        );
        service
          .create(new Ocorrencia())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Ocorrencia', () => {
        const returnedFromService = Object.assign(
          {
            tipoOcorrencia: 'BBBBBB',
            data: currentDate.format(DATE_TIME_FORMAT),
            numero: 'BBBBBB',
            reportarEncarregado: true,
            de: currentDate.format(DATE_FORMAT),
            ate: currentDate.format(DATE_FORMAT),
            descricao: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            data: currentDate,
            de: currentDate,
            ate: currentDate
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

      it('should return a list of Ocorrencia', () => {
        const returnedFromService = Object.assign(
          {
            tipoOcorrencia: 'BBBBBB',
            data: currentDate.format(DATE_TIME_FORMAT),
            numero: 'BBBBBB',
            reportarEncarregado: true,
            de: currentDate.format(DATE_FORMAT),
            ate: currentDate.format(DATE_FORMAT),
            descricao: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            data: currentDate,
            de: currentDate,
            ate: currentDate
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

      it('should delete a Ocorrencia', () => {
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
