import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IContactoInstituicao } from 'app/shared/model/contacto-instituicao.model';

type EntityResponseType = HttpResponse<IContactoInstituicao>;
type EntityArrayResponseType = HttpResponse<IContactoInstituicao[]>;

@Injectable({ providedIn: 'root' })
export class ContactoInstituicaoService {
  public resourceUrl = SERVER_API_URL + 'api/contacto-instituicaos';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/contacto-instituicaos';

  constructor(protected http: HttpClient) {}

  create(contactoInstituicao: IContactoInstituicao): Observable<EntityResponseType> {
    return this.http.post<IContactoInstituicao>(this.resourceUrl, contactoInstituicao, { observe: 'response' });
  }

  update(contactoInstituicao: IContactoInstituicao): Observable<EntityResponseType> {
    return this.http.put<IContactoInstituicao>(this.resourceUrl, contactoInstituicao, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContactoInstituicao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContactoInstituicao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContactoInstituicao[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
