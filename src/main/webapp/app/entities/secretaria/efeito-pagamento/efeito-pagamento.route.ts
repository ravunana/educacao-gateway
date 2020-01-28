import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEfeitoPagamento, EfeitoPagamento } from 'app/shared/model/secretaria/efeito-pagamento.model';
import { EfeitoPagamentoService } from './efeito-pagamento.service';
import { EfeitoPagamentoComponent } from './efeito-pagamento.component';
import { EfeitoPagamentoDetailComponent } from './efeito-pagamento-detail.component';
import { EfeitoPagamentoUpdateComponent } from './efeito-pagamento-update.component';

@Injectable({ providedIn: 'root' })
export class EfeitoPagamentoResolve implements Resolve<IEfeitoPagamento> {
  constructor(private service: EfeitoPagamentoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEfeitoPagamento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((efeitoPagamento: HttpResponse<EfeitoPagamento>) => {
          if (efeitoPagamento.body) {
            return of(efeitoPagamento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EfeitoPagamento());
  }
}

export const efeitoPagamentoRoute: Routes = [
  {
    path: '',
    component: EfeitoPagamentoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'educacaoApp.secretariaEfeitoPagamento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EfeitoPagamentoDetailComponent,
    resolve: {
      efeitoPagamento: EfeitoPagamentoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.secretariaEfeitoPagamento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EfeitoPagamentoUpdateComponent,
    resolve: {
      efeitoPagamento: EfeitoPagamentoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.secretariaEfeitoPagamento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EfeitoPagamentoUpdateComponent,
    resolve: {
      efeitoPagamento: EfeitoPagamentoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.secretariaEfeitoPagamento.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
