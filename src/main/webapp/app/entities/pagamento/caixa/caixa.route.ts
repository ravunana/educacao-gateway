import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICaixa, Caixa } from 'app/shared/model/pagamento/caixa.model';
import { CaixaService } from './caixa.service';
import { CaixaComponent } from './caixa.component';
import { CaixaDetailComponent } from './caixa-detail.component';
import { CaixaUpdateComponent } from './caixa-update.component';

@Injectable({ providedIn: 'root' })
export class CaixaResolve implements Resolve<ICaixa> {
  constructor(private service: CaixaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICaixa> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((caixa: HttpResponse<Caixa>) => {
          if (caixa.body) {
            return of(caixa.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Caixa());
  }
}

export const caixaRoute: Routes = [
  {
    path: '',
    component: CaixaComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'educacaoApp.pagamentoCaixa.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CaixaDetailComponent,
    resolve: {
      caixa: CaixaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pagamentoCaixa.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CaixaUpdateComponent,
    resolve: {
      caixa: CaixaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pagamentoCaixa.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CaixaUpdateComponent,
    resolve: {
      caixa: CaixaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pagamentoCaixa.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
