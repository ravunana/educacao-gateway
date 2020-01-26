import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IContactoInstituicao, ContactoInstituicao } from 'app/shared/model/contacto-instituicao.model';
import { ContactoInstituicaoService } from './contacto-instituicao.service';
import { ContactoInstituicaoComponent } from './contacto-instituicao.component';
import { ContactoInstituicaoDetailComponent } from './contacto-instituicao-detail.component';
import { ContactoInstituicaoUpdateComponent } from './contacto-instituicao-update.component';

@Injectable({ providedIn: 'root' })
export class ContactoInstituicaoResolve implements Resolve<IContactoInstituicao> {
  constructor(private service: ContactoInstituicaoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContactoInstituicao> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((contactoInstituicao: HttpResponse<ContactoInstituicao>) => {
          if (contactoInstituicao.body) {
            return of(contactoInstituicao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ContactoInstituicao());
  }
}

export const contactoInstituicaoRoute: Routes = [
  {
    path: '',
    component: ContactoInstituicaoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'educacaoApp.contactoInstituicao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ContactoInstituicaoDetailComponent,
    resolve: {
      contactoInstituicao: ContactoInstituicaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.contactoInstituicao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ContactoInstituicaoUpdateComponent,
    resolve: {
      contactoInstituicao: ContactoInstituicaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.contactoInstituicao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ContactoInstituicaoUpdateComponent,
    resolve: {
      contactoInstituicao: ContactoInstituicaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'educacaoApp.contactoInstituicao.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
