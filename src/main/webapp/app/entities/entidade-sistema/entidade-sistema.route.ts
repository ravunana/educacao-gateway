import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEntidadeSistema, EntidadeSistema } from 'app/shared/model/entidade-sistema.model';
import { EntidadeSistemaService } from './entidade-sistema.service';
import { EntidadeSistemaComponent } from './entidade-sistema.component';
import { EntidadeSistemaDetailComponent } from './entidade-sistema-detail.component';
import { EntidadeSistemaUpdateComponent } from './entidade-sistema-update.component';

@Injectable({ providedIn: 'root' })
export class EntidadeSistemaResolve implements Resolve<IEntidadeSistema> {
  constructor(private service: EntidadeSistemaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEntidadeSistema> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((entidadeSistema: HttpResponse<EntidadeSistema>) => {
          if (entidadeSistema.body) {
            return of(entidadeSistema.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EntidadeSistema());
  }
}

export const entidadeSistemaRoute: Routes = [
  {
    path: '',
    component: EntidadeSistemaComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'educacaoApp.entidadeSistema.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EntidadeSistemaDetailComponent,
    resolve: {
      entidadeSistema: EntidadeSistemaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.entidadeSistema.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EntidadeSistemaUpdateComponent,
    resolve: {
      entidadeSistema: EntidadeSistemaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.entidadeSistema.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EntidadeSistemaUpdateComponent,
    resolve: {
      entidadeSistema: EntidadeSistemaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.entidadeSistema.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
