import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEncarregadoEducao, EncarregadoEducao } from 'app/shared/model/secretaria/encarregado-educao.model';
import { EncarregadoEducaoService } from './encarregado-educao.service';
import { EncarregadoEducaoComponent } from './encarregado-educao.component';
import { EncarregadoEducaoDetailComponent } from './encarregado-educao-detail.component';
import { EncarregadoEducaoUpdateComponent } from './encarregado-educao-update.component';

@Injectable({ providedIn: 'root' })
export class EncarregadoEducaoResolve implements Resolve<IEncarregadoEducao> {
  constructor(private service: EncarregadoEducaoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEncarregadoEducao> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((encarregadoEducao: HttpResponse<EncarregadoEducao>) => {
          if (encarregadoEducao.body) {
            return of(encarregadoEducao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EncarregadoEducao());
  }
}

export const encarregadoEducaoRoute: Routes = [
  {
    path: '',
    component: EncarregadoEducaoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'educacaoApp.secretariaEncarregadoEducao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EncarregadoEducaoDetailComponent,
    resolve: {
      encarregadoEducao: EncarregadoEducaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.secretariaEncarregadoEducao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EncarregadoEducaoUpdateComponent,
    resolve: {
      encarregadoEducao: EncarregadoEducaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.secretariaEncarregadoEducao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EncarregadoEducaoUpdateComponent,
    resolve: {
      encarregadoEducao: EncarregadoEducaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.secretariaEncarregadoEducao.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
