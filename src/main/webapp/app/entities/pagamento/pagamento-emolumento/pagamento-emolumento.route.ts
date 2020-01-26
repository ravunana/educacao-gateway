import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPagamentoEmolumento, PagamentoEmolumento } from 'app/shared/model/pagamento/pagamento-emolumento.model';
import { PagamentoEmolumentoService } from './pagamento-emolumento.service';
import { PagamentoEmolumentoComponent } from './pagamento-emolumento.component';
import { PagamentoEmolumentoDetailComponent } from './pagamento-emolumento-detail.component';
import { PagamentoEmolumentoUpdateComponent } from './pagamento-emolumento-update.component';

@Injectable({ providedIn: 'root' })
export class PagamentoEmolumentoResolve implements Resolve<IPagamentoEmolumento> {
  constructor(private service: PagamentoEmolumentoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPagamentoEmolumento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pagamentoEmolumento: HttpResponse<PagamentoEmolumento>) => {
          if (pagamentoEmolumento.body) {
            return of(pagamentoEmolumento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PagamentoEmolumento());
  }
}

export const pagamentoEmolumentoRoute: Routes = [
  {
    path: '',
    component: PagamentoEmolumentoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'educacaoApp.pagamentoPagamentoEmolumento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PagamentoEmolumentoDetailComponent,
    resolve: {
      pagamentoEmolumento: PagamentoEmolumentoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pagamentoPagamentoEmolumento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PagamentoEmolumentoUpdateComponent,
    resolve: {
      pagamentoEmolumento: PagamentoEmolumentoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pagamentoPagamentoEmolumento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PagamentoEmolumentoUpdateComponent,
    resolve: {
      pagamentoEmolumento: PagamentoEmolumentoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pagamentoPagamentoEmolumento.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
