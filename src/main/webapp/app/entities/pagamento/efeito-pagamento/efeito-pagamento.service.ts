import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IEfeitoPagamento } from 'app/shared/model/pagamento/efeito-pagamento.model';

type EntityResponseType = HttpResponse<IEfeitoPagamento>;
type EntityArrayResponseType = HttpResponse<IEfeitoPagamento[]>;

@Injectable({ providedIn: 'root' })
export class EfeitoPagamentoService {
  public resourceUrl = SERVER_API_URL + 'services/pagamento/api/efeito-pagamentos';
  public resourceSearchUrl = SERVER_API_URL + 'services/pagamento/api/_search/efeito-pagamentos';

  constructor(protected http: HttpClient) {}

  create(efeitoPagamento: IEfeitoPagamento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(efeitoPagamento);
    return this.http
      .post<IEfeitoPagamento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(efeitoPagamento: IEfeitoPagamento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(efeitoPagamento);
    return this.http
      .put<IEfeitoPagamento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEfeitoPagamento>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEfeitoPagamento[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEfeitoPagamento[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(efeitoPagamento: IEfeitoPagamento): IEfeitoPagamento {
    const copy: IEfeitoPagamento = Object.assign({}, efeitoPagamento, {
      data: efeitoPagamento.data && efeitoPagamento.data.isValid() ? efeitoPagamento.data.toJSON() : undefined,
      vencimento:
        efeitoPagamento.vencimento && efeitoPagamento.vencimento.isValid() ? efeitoPagamento.vencimento.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.data = res.body.data ? moment(res.body.data) : undefined;
      res.body.vencimento = res.body.vencimento ? moment(res.body.vencimento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((efeitoPagamento: IEfeitoPagamento) => {
        efeitoPagamento.data = efeitoPagamento.data ? moment(efeitoPagamento.data) : undefined;
        efeitoPagamento.vencimento = efeitoPagamento.vencimento ? moment(efeitoPagamento.vencimento) : undefined;
      });
    }
    return res;
  }
}
