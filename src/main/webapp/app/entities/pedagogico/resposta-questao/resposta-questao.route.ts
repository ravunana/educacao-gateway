import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRespostaQuestao, RespostaQuestao } from 'app/shared/model/pedagogico/resposta-questao.model';
import { RespostaQuestaoService } from './resposta-questao.service';
import { RespostaQuestaoComponent } from './resposta-questao.component';
import { RespostaQuestaoDetailComponent } from './resposta-questao-detail.component';
import { RespostaQuestaoUpdateComponent } from './resposta-questao-update.component';

@Injectable({ providedIn: 'root' })
export class RespostaQuestaoResolve implements Resolve<IRespostaQuestao> {
  constructor(private service: RespostaQuestaoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRespostaQuestao> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((respostaQuestao: HttpResponse<RespostaQuestao>) => {
          if (respostaQuestao.body) {
            return of(respostaQuestao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RespostaQuestao());
  }
}

export const respostaQuestaoRoute: Routes = [
  {
    path: '',
    component: RespostaQuestaoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'educacaoApp.pedagogicoRespostaQuestao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RespostaQuestaoDetailComponent,
    resolve: {
      respostaQuestao: RespostaQuestaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pedagogicoRespostaQuestao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RespostaQuestaoUpdateComponent,
    resolve: {
      respostaQuestao: RespostaQuestaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pedagogicoRespostaQuestao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RespostaQuestaoUpdateComponent,
    resolve: {
      respostaQuestao: RespostaQuestaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pedagogicoRespostaQuestao.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
