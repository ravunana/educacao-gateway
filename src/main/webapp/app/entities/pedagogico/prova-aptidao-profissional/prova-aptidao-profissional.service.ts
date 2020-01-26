import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IProvaAptidaoProfissional } from 'app/shared/model/pedagogico/prova-aptidao-profissional.model';

type EntityResponseType = HttpResponse<IProvaAptidaoProfissional>;
type EntityArrayResponseType = HttpResponse<IProvaAptidaoProfissional[]>;

@Injectable({ providedIn: 'root' })
export class ProvaAptidaoProfissionalService {
  public resourceUrl = SERVER_API_URL + 'services/pedagogico/api/prova-aptidao-profissionals';
  public resourceSearchUrl = SERVER_API_URL + 'services/pedagogico/api/_search/prova-aptidao-profissionals';

  constructor(protected http: HttpClient) {}

  create(provaAptidaoProfissional: IProvaAptidaoProfissional): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(provaAptidaoProfissional);
    return this.http
      .post<IProvaAptidaoProfissional>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(provaAptidaoProfissional: IProvaAptidaoProfissional): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(provaAptidaoProfissional);
    return this.http
      .put<IProvaAptidaoProfissional>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProvaAptidaoProfissional>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProvaAptidaoProfissional[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProvaAptidaoProfissional[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(provaAptidaoProfissional: IProvaAptidaoProfissional): IProvaAptidaoProfissional {
    const copy: IProvaAptidaoProfissional = Object.assign({}, provaAptidaoProfissional, {
      dataDefesa:
        provaAptidaoProfissional.dataDefesa && provaAptidaoProfissional.dataDefesa.isValid()
          ? provaAptidaoProfissional.dataDefesa.toJSON()
          : undefined,
      inicioEstagio:
        provaAptidaoProfissional.inicioEstagio && provaAptidaoProfissional.inicioEstagio.isValid()
          ? provaAptidaoProfissional.inicioEstagio.format(DATE_FORMAT)
          : undefined,
      finalEstagio:
        provaAptidaoProfissional.finalEstagio && provaAptidaoProfissional.finalEstagio.isValid()
          ? provaAptidaoProfissional.finalEstagio.format(DATE_FORMAT)
          : undefined,
      data: provaAptidaoProfissional.data && provaAptidaoProfissional.data.isValid() ? provaAptidaoProfissional.data.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataDefesa = res.body.dataDefesa ? moment(res.body.dataDefesa) : undefined;
      res.body.inicioEstagio = res.body.inicioEstagio ? moment(res.body.inicioEstagio) : undefined;
      res.body.finalEstagio = res.body.finalEstagio ? moment(res.body.finalEstagio) : undefined;
      res.body.data = res.body.data ? moment(res.body.data) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((provaAptidaoProfissional: IProvaAptidaoProfissional) => {
        provaAptidaoProfissional.dataDefesa = provaAptidaoProfissional.dataDefesa ? moment(provaAptidaoProfissional.dataDefesa) : undefined;
        provaAptidaoProfissional.inicioEstagio = provaAptidaoProfissional.inicioEstagio
          ? moment(provaAptidaoProfissional.inicioEstagio)
          : undefined;
        provaAptidaoProfissional.finalEstagio = provaAptidaoProfissional.finalEstagio
          ? moment(provaAptidaoProfissional.finalEstagio)
          : undefined;
        provaAptidaoProfissional.data = provaAptidaoProfissional.data ? moment(provaAptidaoProfissional.data) : undefined;
      });
    }
    return res;
  }
}
