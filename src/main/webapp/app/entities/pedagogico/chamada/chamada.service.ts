import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IChamada } from 'app/shared/model/pedagogico/chamada.model';

type EntityResponseType = HttpResponse<IChamada>;
type EntityArrayResponseType = HttpResponse<IChamada[]>;

@Injectable({ providedIn: 'root' })
export class ChamadaService {
  public resourceUrl = SERVER_API_URL + 'services/pedagogico/api/chamadas';
  public resourceSearchUrl = SERVER_API_URL + 'services/pedagogico/api/_search/chamadas';

  constructor(protected http: HttpClient) {}

  create(chamada: IChamada): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chamada);
    return this.http
      .post<IChamada>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(chamada: IChamada): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chamada);
    return this.http
      .put<IChamada>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IChamada>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IChamada[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IChamada[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(chamada: IChamada): IChamada {
    const copy: IChamada = Object.assign({}, chamada, {
      data: chamada.data && chamada.data.isValid() ? chamada.data.toJSON() : undefined
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
      res.body.forEach((chamada: IChamada) => {
        chamada.data = chamada.data ? moment(chamada.data) : undefined;
      });
    }
    return res;
  }
}
