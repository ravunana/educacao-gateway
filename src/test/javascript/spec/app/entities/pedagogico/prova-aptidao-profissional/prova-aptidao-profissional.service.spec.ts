import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ProvaAptidaoProfissionalService } from 'app/entities/pedagogico/prova-aptidao-profissional/prova-aptidao-profissional.service';
import { IProvaAptidaoProfissional, ProvaAptidaoProfissional } from 'app/shared/model/pedagogico/prova-aptidao-profissional.model';

describe('Service Tests', () => {
  describe('ProvaAptidaoProfissional Service', () => {
    let injector: TestBed;
    let service: ProvaAptidaoProfissionalService;
    let httpMock: HttpTestingController;
    let elemDefault: IProvaAptidaoProfissional;
    let expectedResult: IProvaAptidaoProfissional | IProvaAptidaoProfissional[] | boolean | null;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ProvaAptidaoProfissionalService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ProvaAptidaoProfissional(
        0,
        'AAAAAAA',
        'AAAAAAA',
        0,
        0,
        'AAAAAAA',
        0,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate,
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataDefesa: currentDate.format(DATE_TIME_FORMAT),
            inicioEstagio: currentDate.format(DATE_FORMAT),
            finalEstagio: currentDate.format(DATE_FORMAT),
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

      it('should create a ProvaAptidaoProfissional', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataDefesa: currentDate.format(DATE_TIME_FORMAT),
            inicioEstagio: currentDate.format(DATE_FORMAT),
            finalEstagio: currentDate.format(DATE_FORMAT),
            data: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dataDefesa: currentDate,
            inicioEstagio: currentDate,
            finalEstagio: currentDate,
            data: currentDate
          },
          returnedFromService
        );
        service
          .create(new ProvaAptidaoProfissional())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ProvaAptidaoProfissional', () => {
        const returnedFromService = Object.assign(
          {
            numeroProcesso: 'BBBBBB',
            nomeAluno: 'BBBBBB',
            livroRegistro: 1,
            folhaRegistro: 1,
            temaProjectoTecnologio: 'BBBBBB',
            notaProjectoTecnologio: 1,
            dataDefesa: currentDate.format(DATE_TIME_FORMAT),
            localEstagio: 'BBBBBB',
            aproveitamentoEstagio: 'BBBBBB',
            inicioEstagio: currentDate.format(DATE_FORMAT),
            finalEstagio: currentDate.format(DATE_FORMAT),
            data: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataDefesa: currentDate,
            inicioEstagio: currentDate,
            finalEstagio: currentDate,
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

      it('should return a list of ProvaAptidaoProfissional', () => {
        const returnedFromService = Object.assign(
          {
            numeroProcesso: 'BBBBBB',
            nomeAluno: 'BBBBBB',
            livroRegistro: 1,
            folhaRegistro: 1,
            temaProjectoTecnologio: 'BBBBBB',
            notaProjectoTecnologio: 1,
            dataDefesa: currentDate.format(DATE_TIME_FORMAT),
            localEstagio: 'BBBBBB',
            aproveitamentoEstagio: 'BBBBBB',
            inicioEstagio: currentDate.format(DATE_FORMAT),
            finalEstagio: currentDate.format(DATE_FORMAT),
            data: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dataDefesa: currentDate,
            inicioEstagio: currentDate,
            finalEstagio: currentDate,
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

      it('should delete a ProvaAptidaoProfissional', () => {
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
