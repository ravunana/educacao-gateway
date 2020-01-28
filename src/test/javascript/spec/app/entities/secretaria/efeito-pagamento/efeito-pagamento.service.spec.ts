import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { EfeitoPagamentoService } from 'app/entities/secretaria/efeito-pagamento/efeito-pagamento.service';
import { IEfeitoPagamento, EfeitoPagamento } from 'app/shared/model/secretaria/efeito-pagamento.model';

describe('Service Tests', () => {
  describe('EfeitoPagamento Service', () => {
    let injector: TestBed;
    let service: EfeitoPagamentoService;
    let httpMock: HttpTestingController;
    let elemDefault: IEfeitoPagamento;
    let expectedResult: IEfeitoPagamento | IEfeitoPagamento[] | boolean | null;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EfeitoPagamentoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new EfeitoPagamento(0, 'AAAAAAA', 0, 0, 0, 0, 0, currentDate, currentDate, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            data: currentDate.format(DATE_TIME_FORMAT),
            vencimento: currentDate.format(DATE_FORMAT)
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

      it('should create a EfeitoPagamento', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            data: currentDate.format(DATE_TIME_FORMAT),
            vencimento: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            data: currentDate,
            vencimento: currentDate
          },
          returnedFromService
        );
        service
          .create(new EfeitoPagamento())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a EfeitoPagamento', () => {
        const returnedFromService = Object.assign(
          {
            descricao: 'BBBBBB',
            quantidade: 1,
            montante: 1,
            desconto: 1,
            multa: 1,
            juro: 1,
            data: currentDate.format(DATE_TIME_FORMAT),
            vencimento: currentDate.format(DATE_FORMAT),
            quitado: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            data: currentDate,
            vencimento: currentDate
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

      it('should return a list of EfeitoPagamento', () => {
        const returnedFromService = Object.assign(
          {
            descricao: 'BBBBBB',
            quantidade: 1,
            montante: 1,
            desconto: 1,
            multa: 1,
            juro: 1,
            data: currentDate.format(DATE_TIME_FORMAT),
            vencimento: currentDate.format(DATE_FORMAT),
            quitado: true
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            data: currentDate,
            vencimento: currentDate
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

      it('should delete a EfeitoPagamento', () => {
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
