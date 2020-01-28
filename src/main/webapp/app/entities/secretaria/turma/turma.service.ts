import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { ITurma } from 'app/shared/model/secretaria/turma.model';

type EntityResponseType = HttpResponse<ITurma>;
type EntityArrayResponseType = HttpResponse<ITurma[]>;

@Injectable({ providedIn: 'root' })
export class TurmaService {
  public resourceUrl = SERVER_API_URL + 'services/secretaria/api/turmas';
  public resourceSearchUrl = SERVER_API_URL + 'services/secretaria/api/_search/turmas';

  constructor(protected http: HttpClient) {}

  create(turma: ITurma): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(turma);
    return this.http
      .post<ITurma>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(turma: ITurma): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(turma);
    return this.http
      .put<ITurma>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITurma>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITurma[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITurma[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(turma: ITurma): ITurma {
    const copy: ITurma = Object.assign({}, turma, {
      data: turma.data && turma.data.isValid() ? turma.data.toJSON() : undefined,
      abertura: turma.abertura && turma.abertura.isValid() ? turma.abertura.format(DATE_FORMAT) : undefined,
      encerramento: turma.encerramento && turma.encerramento.isValid() ? turma.encerramento.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.data = res.body.data ? moment(res.body.data) : undefined;
      res.body.abertura = res.body.abertura ? moment(res.body.abertura) : undefined;
      res.body.encerramento = res.body.encerramento ? moment(res.body.encerramento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((turma: ITurma) => {
        turma.data = turma.data ? moment(turma.data) : undefined;
        turma.abertura = turma.abertura ? moment(turma.abertura) : undefined;
        turma.encerramento = turma.encerramento ? moment(turma.encerramento) : undefined;
      });
    }
    return res;
  }
}
