import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IQuestaoTeste } from 'app/shared/model/pedagogico/questao-teste.model';

type EntityResponseType = HttpResponse<IQuestaoTeste>;
type EntityArrayResponseType = HttpResponse<IQuestaoTeste[]>;

@Injectable({ providedIn: 'root' })
export class QuestaoTesteService {
  public resourceUrl = SERVER_API_URL + 'services/pedagogico/api/questao-testes';
  public resourceSearchUrl = SERVER_API_URL + 'services/pedagogico/api/_search/questao-testes';

  constructor(protected http: HttpClient) {}

  create(questaoTeste: IQuestaoTeste): Observable<EntityResponseType> {
    return this.http.post<IQuestaoTeste>(this.resourceUrl, questaoTeste, { observe: 'response' });
  }

  update(questaoTeste: IQuestaoTeste): Observable<EntityResponseType> {
    return this.http.put<IQuestaoTeste>(this.resourceUrl, questaoTeste, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQuestaoTeste>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQuestaoTeste[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQuestaoTeste[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
