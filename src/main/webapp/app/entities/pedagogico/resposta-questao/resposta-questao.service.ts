import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IRespostaQuestao } from 'app/shared/model/pedagogico/resposta-questao.model';

type EntityResponseType = HttpResponse<IRespostaQuestao>;
type EntityArrayResponseType = HttpResponse<IRespostaQuestao[]>;

@Injectable({ providedIn: 'root' })
export class RespostaQuestaoService {
  public resourceUrl = SERVER_API_URL + 'services/pedagogico/api/resposta-questaos';
  public resourceSearchUrl = SERVER_API_URL + 'services/pedagogico/api/_search/resposta-questaos';

  constructor(protected http: HttpClient) {}

  create(respostaQuestao: IRespostaQuestao): Observable<EntityResponseType> {
    return this.http.post<IRespostaQuestao>(this.resourceUrl, respostaQuestao, { observe: 'response' });
  }

  update(respostaQuestao: IRespostaQuestao): Observable<EntityResponseType> {
    return this.http.put<IRespostaQuestao>(this.resourceUrl, respostaQuestao, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRespostaQuestao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRespostaQuestao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRespostaQuestao[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
