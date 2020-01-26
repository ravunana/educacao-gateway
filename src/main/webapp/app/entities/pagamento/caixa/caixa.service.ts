import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { ICaixa } from 'app/shared/model/pagamento/caixa.model';

type EntityResponseType = HttpResponse<ICaixa>;
type EntityArrayResponseType = HttpResponse<ICaixa[]>;

@Injectable({ providedIn: 'root' })
export class CaixaService {
  public resourceUrl = SERVER_API_URL + 'services/pagamento/api/caixas';
  public resourceSearchUrl = SERVER_API_URL + 'services/pagamento/api/_search/caixas';

  constructor(protected http: HttpClient) {}

  create(caixa: ICaixa): Observable<EntityResponseType> {
    return this.http.post<ICaixa>(this.resourceUrl, caixa, { observe: 'response' });
  }

  update(caixa: ICaixa): Observable<EntityResponseType> {
    return this.http.put<ICaixa>(this.resourceUrl, caixa, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICaixa>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICaixa[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICaixa[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
