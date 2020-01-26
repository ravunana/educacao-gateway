import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProvaAptidaoProfissional, ProvaAptidaoProfissional } from 'app/shared/model/pedagogico/prova-aptidao-profissional.model';
import { ProvaAptidaoProfissionalService } from './prova-aptidao-profissional.service';
import { ProvaAptidaoProfissionalComponent } from './prova-aptidao-profissional.component';
import { ProvaAptidaoProfissionalDetailComponent } from './prova-aptidao-profissional-detail.component';
import { ProvaAptidaoProfissionalUpdateComponent } from './prova-aptidao-profissional-update.component';

@Injectable({ providedIn: 'root' })
export class ProvaAptidaoProfissionalResolve implements Resolve<IProvaAptidaoProfissional> {
  constructor(private service: ProvaAptidaoProfissionalService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProvaAptidaoProfissional> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((provaAptidaoProfissional: HttpResponse<ProvaAptidaoProfissional>) => {
          if (provaAptidaoProfissional.body) {
            return of(provaAptidaoProfissional.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProvaAptidaoProfissional());
  }
}

export const provaAptidaoProfissionalRoute: Routes = [
  {
    path: '',
    component: ProvaAptidaoProfissionalComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'educacaoApp.pedagogicoProvaAptidaoProfissional.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProvaAptidaoProfissionalDetailComponent,
    resolve: {
      provaAptidaoProfissional: ProvaAptidaoProfissionalResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pedagogicoProvaAptidaoProfissional.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProvaAptidaoProfissionalUpdateComponent,
    resolve: {
      provaAptidaoProfissional: ProvaAptidaoProfissionalResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pedagogicoProvaAptidaoProfissional.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProvaAptidaoProfissionalUpdateComponent,
    resolve: {
      provaAptidaoProfissional: ProvaAptidaoProfissionalResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pedagogicoProvaAptidaoProfissional.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
