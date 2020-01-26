import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IEntidadeSistema } from 'app/shared/model/entidade-sistema.model';

type EntityResponseType = HttpResponse<IEntidadeSistema>;
type EntityArrayResponseType = HttpResponse<IEntidadeSistema[]>;

@Injectable({ providedIn: 'root' })
export class EntidadeSistemaService {
  public resourceUrl = SERVER_API_URL + 'api/entidade-sistemas';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/entidade-sistemas';

  constructor(protected http: HttpClient) {}

  create(entidadeSistema: IEntidadeSistema): Observable<EntityResponseType> {
    return this.http.post<IEntidadeSistema>(this.resourceUrl, entidadeSistema, { observe: 'response' });
  }

  update(entidadeSistema: IEntidadeSistema): Observable<EntityResponseType> {
    return this.http.put<IEntidadeSistema>(this.resourceUrl, entidadeSistema, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEntidadeSistema>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEntidadeSistema[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEntidadeSistema[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
