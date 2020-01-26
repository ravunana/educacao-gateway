import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITesteConhecimento, TesteConhecimento } from 'app/shared/model/pedagogico/teste-conhecimento.model';
import { TesteConhecimentoService } from './teste-conhecimento.service';
import { TesteConhecimentoComponent } from './teste-conhecimento.component';
import { TesteConhecimentoDetailComponent } from './teste-conhecimento-detail.component';
import { TesteConhecimentoUpdateComponent } from './teste-conhecimento-update.component';

@Injectable({ providedIn: 'root' })
export class TesteConhecimentoResolve implements Resolve<ITesteConhecimento> {
  constructor(private service: TesteConhecimentoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITesteConhecimento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((testeConhecimento: HttpResponse<TesteConhecimento>) => {
          if (testeConhecimento.body) {
            return of(testeConhecimento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TesteConhecimento());
  }
}

export const testeConhecimentoRoute: Routes = [
  {
    path: '',
    component: TesteConhecimentoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'educacaoApp.pedagogicoTesteConhecimento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TesteConhecimentoDetailComponent,
    resolve: {
      testeConhecimento: TesteConhecimentoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pedagogicoTesteConhecimento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TesteConhecimentoUpdateComponent,
    resolve: {
      testeConhecimento: TesteConhecimentoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pedagogicoTesteConhecimento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TesteConhecimentoUpdateComponent,
    resolve: {
      testeConhecimento: TesteConhecimentoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pedagogicoTesteConhecimento.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
