import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IDosificacao } from 'app/shared/model/pedagogico/dosificacao.model';

type EntityResponseType = HttpResponse<IDosificacao>;
type EntityArrayResponseType = HttpResponse<IDosificacao[]>;

@Injectable({ providedIn: 'root' })
export class DosificacaoService {
  public resourceUrl = SERVER_API_URL + 'services/pedagogico/api/dosificacaos';
  public resourceSearchUrl = SERVER_API_URL + 'services/pedagogico/api/_search/dosificacaos';

  constructor(protected http: HttpClient) {}

  create(dosificacao: IDosificacao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dosificacao);
    return this.http
      .post<IDosificacao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(dosificacao: IDosificacao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dosificacao);
    return this.http
      .put<IDosificacao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDosificacao>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDosificacao[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDosificacao[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(dosificacao: IDosificacao): IDosificacao {
    const copy: IDosificacao = Object.assign({}, dosificacao, {
      de: dosificacao.de && dosificacao.de.isValid() ? dosificacao.de.format(DATE_FORMAT) : undefined,
      ate: dosificacao.ate && dosificacao.ate.isValid() ? dosificacao.ate.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.de = res.body.de ? moment(res.body.de) : undefined;
      res.body.ate = res.body.ate ? moment(res.body.ate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((dosificacao: IDosificacao) => {
        dosificacao.de = dosificacao.de ? moment(dosificacao.de) : undefined;
        dosificacao.ate = dosificacao.ate ? moment(dosificacao.ate) : undefined;
      });
    }
    return res;
  }
}
