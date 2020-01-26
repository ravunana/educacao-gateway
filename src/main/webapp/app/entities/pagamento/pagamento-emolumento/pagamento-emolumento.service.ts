import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IPagamentoEmolumento } from 'app/shared/model/pagamento/pagamento-emolumento.model';

type EntityResponseType = HttpResponse<IPagamentoEmolumento>;
type EntityArrayResponseType = HttpResponse<IPagamentoEmolumento[]>;

@Injectable({ providedIn: 'root' })
export class PagamentoEmolumentoService {
  public resourceUrl = SERVER_API_URL + 'services/pagamento/api/pagamento-emolumentos';
  public resourceSearchUrl = SERVER_API_URL + 'services/pagamento/api/_search/pagamento-emolumentos';

  constructor(protected http: HttpClient) {}

  create(pagamentoEmolumento: IPagamentoEmolumento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pagamentoEmolumento);
    return this.http
      .post<IPagamentoEmolumento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(pagamentoEmolumento: IPagamentoEmolumento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pagamentoEmolumento);
    return this.http
      .put<IPagamentoEmolumento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPagamentoEmolumento>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPagamentoEmolumento[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPagamentoEmolumento[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(pagamentoEmolumento: IPagamentoEmolumento): IPagamentoEmolumento {
    const copy: IPagamentoEmolumento = Object.assign({}, pagamentoEmolumento, {
      data: pagamentoEmolumento.data && pagamentoEmolumento.data.isValid() ? pagamentoEmolumento.data.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.data = res.body.data ? moment(res.body.data) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((pagamentoEmolumento: IPagamentoEmolumento) => {
        pagamentoEmolumento.data = pagamentoEmolumento.data ? moment(pagamentoEmolumento.data) : undefined;
      });
    }
    return res;
  }
}
