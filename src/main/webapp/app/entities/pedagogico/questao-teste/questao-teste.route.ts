import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IQuestaoTeste, QuestaoTeste } from 'app/shared/model/pedagogico/questao-teste.model';
import { QuestaoTesteService } from './questao-teste.service';
import { QuestaoTesteComponent } from './questao-teste.component';
import { QuestaoTesteDetailComponent } from './questao-teste-detail.component';
import { QuestaoTesteUpdateComponent } from './questao-teste-update.component';

@Injectable({ providedIn: 'root' })
export class QuestaoTesteResolve implements Resolve<IQuestaoTeste> {
  constructor(private service: QuestaoTesteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IQuestaoTeste> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((questaoTeste: HttpResponse<QuestaoTeste>) => {
          if (questaoTeste.body) {
            return of(questaoTeste.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new QuestaoTeste());
  }
}

export const questaoTesteRoute: Routes = [
  {
    path: '',
    component: QuestaoTesteComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'educacaoApp.pedagogicoQuestaoTeste.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: QuestaoTesteDetailComponent,
    resolve: {
      questaoTeste: QuestaoTesteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pedagogicoQuestaoTeste.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: QuestaoTesteUpdateComponent,
    resolve: {
      questaoTeste: QuestaoTesteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pedagogicoQuestaoTeste.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: QuestaoTesteUpdateComponent,
    resolve: {
      questaoTeste: QuestaoTesteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pedagogicoQuestaoTeste.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
