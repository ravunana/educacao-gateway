import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { EncarregadoEducaoService } from 'app/entities/secretaria/encarregado-educao/encarregado-educao.service';
import { IEncarregadoEducao, EncarregadoEducao } from 'app/shared/model/secretaria/encarregado-educao.model';

describe('Service Tests', () => {
  describe('EncarregadoEducao Service', () => {
    let injector: TestBed;
    let service: EncarregadoEducaoService;
    let httpMock: HttpTestingController;
    let elemDefault: IEncarregadoEducao;
    let expectedResult: IEncarregadoEducao | IEncarregadoEducao[] | boolean | null;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EncarregadoEducaoService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new EncarregadoEducao(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
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
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a EncarregadoEducao', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new EncarregadoEducao())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a EncarregadoEducao', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            sexo: 'BBBBBB',
            nif: 'BBBBBB',
            numeroIdentificacao: 'BBBBBB',
            residencia: 'BBBBBB',
            contactoPessoal: 'BBBBBB',
            contactoTrabalho: 'BBBBBB',
            contactoResidencia: 'BBBBBB',
            email: 'BBBBBB',
            localTrabalho: 'BBBBBB',
            cargo: 'BBBBBB',
            salario: 1,
            grauParentesco: 'BBBBBB'
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

      it('should return a list of EncarregadoEducao', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            sexo: 'BBBBBB',
            nif: 'BBBBBB',
            numeroIdentificacao: 'BBBBBB',
            residencia: 'BBBBBB',
            contactoPessoal: 'BBBBBB',
            contactoTrabalho: 'BBBBBB',
            contactoResidencia: 'BBBBBB',
            email: 'BBBBBB',
            localTrabalho: 'BBBBBB',
            cargo: 'BBBBBB',
            salario: 1,
            grauParentesco: 'BBBBBB'
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

      it('should delete a EncarregadoEducao', () => {
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
