import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IChamada, Chamada } from 'app/shared/model/pedagogico/chamada.model';
import { ChamadaService } from './chamada.service';
import { ChamadaComponent } from './chamada.component';
import { ChamadaDetailComponent } from './chamada-detail.component';
import { ChamadaUpdateComponent } from './chamada-update.component';

@Injectable({ providedIn: 'root' })
export class ChamadaResolve implements Resolve<IChamada> {
  constructor(private service: ChamadaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChamada> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((chamada: HttpResponse<Chamada>) => {
          if (chamada.body) {
            return of(chamada.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Chamada());
  }
}

export const chamadaRoute: Routes = [
  {
    path: '',
    component: ChamadaComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'educacaoApp.pedagogicoChamada.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ChamadaDetailComponent,
    resolve: {
      chamada: ChamadaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pedagogicoChamada.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ChamadaUpdateComponent,
    resolve: {
      chamada: ChamadaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pedagogicoChamada.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ChamadaUpdateComponent,
    resolve: {
      chamada: ChamadaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pedagogicoChamada.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
