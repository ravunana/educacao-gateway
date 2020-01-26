import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IContaAluno } from 'app/shared/model/pagamento/conta-aluno.model';

type EntityResponseType = HttpResponse<IContaAluno>;
type EntityArrayResponseType = HttpResponse<IContaAluno[]>;

@Injectable({ providedIn: 'root' })
export class ContaAlunoService {
  public resourceUrl = SERVER_API_URL + 'services/pagamento/api/conta-alunos';
  public resourceSearchUrl = SERVER_API_URL + 'services/pagamento/api/_search/conta-alunos';

  constructor(protected http: HttpClient) {}

  create(contaAluno: IContaAluno): Observable<EntityResponseType> {
    return this.http.post<IContaAluno>(this.resourceUrl, contaAluno, { observe: 'response' });
  }

  update(contaAluno: IContaAluno): Observable<EntityResponseType> {
    return this.http.put<IContaAluno>(this.resourceUrl, contaAluno, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContaAluno>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContaAluno[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContaAluno[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
