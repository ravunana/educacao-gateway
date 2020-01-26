import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IContaAluno, ContaAluno } from 'app/shared/model/pagamento/conta-aluno.model';
import { ContaAlunoService } from './conta-aluno.service';
import { ContaAlunoComponent } from './conta-aluno.component';
import { ContaAlunoDetailComponent } from './conta-aluno-detail.component';
import { ContaAlunoUpdateComponent } from './conta-aluno-update.component';

@Injectable({ providedIn: 'root' })
export class ContaAlunoResolve implements Resolve<IContaAluno> {
  constructor(private service: ContaAlunoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContaAluno> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((contaAluno: HttpResponse<ContaAluno>) => {
          if (contaAluno.body) {
            return of(contaAluno.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ContaAluno());
  }
}

export const contaAlunoRoute: Routes = [
  {
    path: '',
    component: ContaAlunoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'educacaoApp.pagamentoContaAluno.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ContaAlunoDetailComponent,
    resolve: {
      contaAluno: ContaAlunoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pagamentoContaAluno.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ContaAlunoUpdateComponent,
    resolve: {
      contaAluno: ContaAlunoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pagamentoContaAluno.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ContaAlunoUpdateComponent,
    resolve: {
      contaAluno: ContaAlunoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.pagamentoContaAluno.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
