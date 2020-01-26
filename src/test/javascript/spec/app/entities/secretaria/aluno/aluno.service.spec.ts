import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AlunoService } from 'app/entities/secretaria/aluno/aluno.service';
import { IAluno, Aluno } from 'app/shared/model/secretaria/aluno.model';

describe('Service Tests', () => {
  describe('Aluno Service', () => {
    let injector: TestBed;
    let service: AlunoService;
    let httpMock: HttpTestingController;
    let elemDefault: IAluno;
    let expectedResult: IAluno | IAluno[] | boolean | null;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AlunoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Aluno(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        false,
        'AAAAAAA',
        false,
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        false,
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        currentDate,
        'AAAAAAA',
        false,
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            nascimento: currentDate.format(DATE_FORMAT),
            emissao: currentDate.format(DATE_FORMAT),
            validade: currentDate.format(DATE_FORMAT),
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

      it('should create a Aluno', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            nascimento: currentDate.format(DATE_FORMAT),
            emissao: currentDate.format(DATE_FORMAT),
            validade: currentDate.format(DATE_FORMAT),
            data: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            nascimento: currentDate,
            emissao: currentDate,
            validade: currentDate,
            data: currentDate
          },
          returnedFromService
        );
        service
          .create(new Aluno())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Aluno', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            sexo: 'BBBBBB',
            fotografia: 'BBBBBB',
            pai: 'BBBBBB',
            mae: 'BBBBBB',
            nascimento: currentDate.format(DATE_FORMAT),
            nacionalidade: 'BBBBBB',
            naturalidade: 'BBBBBB',
            contacto: 'BBBBBB',
            email: 'BBBBBB',
            tipoDocumento: 'BBBBBB',
            numeroDocumento: 'BBBBBB',
            emissao: currentDate.format(DATE_FORMAT),
            validade: currentDate.format(DATE_FORMAT),
            localEmissao: 'BBBBBB',
            nif: 'BBBBBB',
            provincia: 'BBBBBB',
            municipio: 'BBBBBB',
            bairro: 'BBBBBB',
            rua: 'BBBBBB',
            quarteirao: 'BBBBBB',
            numeroPorta: 'BBBBBB',
            fazEducacaoFisica: true,
            grupoSanguinio: 'BBBBBB',
            autorizaMedicamento: true,
            altura: 1,
            peso: 1,
            nomeMedico: 'BBBBBB',
            contactoMedico: 'BBBBBB',
            desmaioConstante: true,
            alergia: 'BBBBBB',
            dificiencia: 'BBBBBB',
            anoConclusao: 1,
            situacaoAnterior: 'BBBBBB',
            meioTransporte: 'BBBBBB',
            escolaAnterior: 'BBBBBB',
            classeAnterior: 1,
            cursoAnterior: 'BBBBBB',
            data: currentDate.format(DATE_TIME_FORMAT),
            numeroProcesso: 'BBBBBB',
            transferido: true,
            observacao: 'BBBBBB',
            situacaoAtual: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            nascimento: currentDate,
            emissao: currentDate,
            validade: currentDate,
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

      it('should return a list of Aluno', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            sexo: 'BBBBBB',
            fotografia: 'BBBBBB',
            pai: 'BBBBBB',
            mae: 'BBBBBB',
            nascimento: currentDate.format(DATE_FORMAT),
            nacionalidade: 'BBBBBB',
            naturalidade: 'BBBBBB',
            contacto: 'BBBBBB',
            email: 'BBBBBB',
            tipoDocumento: 'BBBBBB',
            numeroDocumento: 'BBBBBB',
            emissao: currentDate.format(DATE_FORMAT),
            validade: currentDate.format(DATE_FORMAT),
            localEmissao: 'BBBBBB',
            nif: 'BBBBBB',
            provincia: 'BBBBBB',
            municipio: 'BBBBBB',
            bairro: 'BBBBBB',
            rua: 'BBBBBB',
            quarteirao: 'BBBBBB',
            numeroPorta: 'BBBBBB',
            fazEducacaoFisica: true,
            grupoSanguinio: 'BBBBBB',
            autorizaMedicamento: true,
            altura: 1,
            peso: 1,
            nomeMedico: 'BBBBBB',
            contactoMedico: 'BBBBBB',
            desmaioConstante: true,
            alergia: 'BBBBBB',
            dificiencia: 'BBBBBB',
            anoConclusao: 1,
            situacaoAnterior: 'BBBBBB',
            meioTransporte: 'BBBBBB',
            escolaAnterior: 'BBBBBB',
            classeAnterior: 1,
            cursoAnterior: 'BBBBBB',
            data: currentDate.format(DATE_TIME_FORMAT),
            numeroProcesso: 'BBBBBB',
            transferido: true,
            observacao: 'BBBBBB',
            situacaoAtual: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            nascimento: currentDate,
            emissao: currentDate,
            validade: currentDate,
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

      it('should delete a Aluno', () => {
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
