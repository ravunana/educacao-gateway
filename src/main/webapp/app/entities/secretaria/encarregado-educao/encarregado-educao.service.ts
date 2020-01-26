import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IEncarregadoEducao } from 'app/shared/model/secretaria/encarregado-educao.model';

type EntityResponseType = HttpResponse<IEncarregadoEducao>;
type EntityArrayResponseType = HttpResponse<IEncarregadoEducao[]>;

@Injectable({ providedIn: 'root' })
export class EncarregadoEducaoService {
  public resourceUrl = SERVER_API_URL + 'services/secretaria/api/encarregado-educaos';
  public resourceSearchUrl = SERVER_API_URL + 'services/secretaria/api/_search/encarregado-educaos';

  constructor(protected http: HttpClient) {}

  create(encarregadoEducao: IEncarregadoEducao): Observable<EntityResponseType> {
    return this.http.post<IEncarregadoEducao>(this.resourceUrl, encarregadoEducao, { observe: 'response' });
  }

  update(encarregadoEducao: IEncarregadoEducao): Observable<EntityResponseType> {
    return this.http.put<IEncarregadoEducao>(this.resourceUrl, encarregadoEducao, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEncarregadoEducao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEncarregadoEducao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEncarregadoEducao[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
