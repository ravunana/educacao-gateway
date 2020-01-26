import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { NotaService } from 'app/entities/pedagogico/nota/nota.service';
import { INota, Nota } from 'app/shared/model/pedagogico/nota.model';

describe('Service Tests', () => {
  describe('Nota Service', () => {
    let injector: TestBed;
    let service: NotaService;
    let httpMock: HttpTestingController;
    let elemDefault: INota;
    let expectedResult: INota | INota[] | boolean | null;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(NotaService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Nota(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0, 0, 0, 0, 0, 0, 0, 0, 0, 'image/png', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Nota', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new Nota())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Nota', () => {
        const returnedFromService = Object.assign(
          {
            numeroProcesso: 'BBBBBB',
            nomeAluno: 'BBBBBB',
            disciplina: 'BBBBBB',
            peridoLectivo: 'BBBBBB',
            anoLectivo: 1,
            faltaJustificada: 1,
            faltaInjustificada: 1,
            avaliacaoContinuca: 1,
            primeiraProva: 1,
            segundaProva: 1,
            exame: 1,
            recurso: 1,
            exameEspecial: 1,
            prova: 'BBBBBB',
            situacao: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Nota', () => {
        const returnedFromService = Object.assign(
          {
            numeroProcesso: 'BBBBBB',
            nomeAluno: 'BBBBBB',
            disciplina: 'BBBBBB',
            peridoLectivo: 'BBBBBB',
            anoLectivo: 1,
            faltaJustificada: 1,
            faltaInjustificada: 1,
            avaliacaoContinuca: 1,
            primeiraProva: 1,
            segundaProva: 1,
            exame: 1,
            recurso: 1,
            exameEspecial: 1,
            prova: 'BBBBBB',
            situacao: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
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

      it('should delete a Nota', () => {
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
