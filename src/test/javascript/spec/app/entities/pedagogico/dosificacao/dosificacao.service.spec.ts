import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { DosificacaoService } from 'app/entities/pedagogico/dosificacao/dosificacao.service';
import { IDosificacao, Dosificacao } from 'app/shared/model/pedagogico/dosificacao.model';

describe('Service Tests', () => {
  describe('Dosificacao Service', () => {
    let injector: TestBed;
    let service: DosificacaoService;
    let httpMock: HttpTestingController;
    let elemDefault: IDosificacao;
    let expectedResult: IDosificacao | IDosificacao[] | boolean | null;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DosificacaoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Dosificacao(
        0,
        'AAAAAAA',
        'AAAAAAA',
        0,
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
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

      it('should create a Dosificacao', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            de: currentDate.format(DATE_FORMAT),
            ate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            de: currentDate,
            ate: currentDate
          },
          returnedFromService
        );
        service
          .create(new Dosificacao())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Dosificacao', () => {
        const returnedFromService = Object.assign(
          {
            peridoLective: 'BBBBBB',
            objectivoGeral: 'BBBBBB',
            semanaLectiva: 1,
            de: currentDate.format(DATE_FORMAT),
            ate: currentDate.format(DATE_FORMAT),
            unidadeTematica: 'BBBBBB',
            conteudo: 'BBBBBB',
            procedimentoEnsino: 'BBBBBB',
            recursosDidaticos: 'BBBBBB',
            tempoAula: 1,
            formaAvaliacao: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
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

      it('should return a list of Dosificacao', () => {
        const returnedFromService = Object.assign(
          {
            peridoLective: 'BBBBBB',
            objectivoGeral: 'BBBBBB',
            semanaLectiva: 1,
            de: currentDate.format(DATE_FORMAT),
            ate: currentDate.format(DATE_FORMAT),
            unidadeTematica: 'BBBBBB',
            conteudo: 'BBBBBB',
            procedimentoEnsino: 'BBBBBB',
            recursosDidaticos: 'BBBBBB',
            tempoAula: 1,
            formaAvaliacao: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
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

      it('should delete a Dosificacao', () => {
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
