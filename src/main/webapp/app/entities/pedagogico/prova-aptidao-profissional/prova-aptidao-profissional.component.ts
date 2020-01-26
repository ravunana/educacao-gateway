import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProvaAptidaoProfissional } from 'app/shared/model/pedagogico/prova-aptidao-profissional.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ProvaAptidaoProfissionalService } from './prova-aptidao-profissional.service';
import { ProvaAptidaoProfissionalDeleteDialogComponent } from './prova-aptidao-profissional-delete-dialog.component';

@Component({
  selector: 'rv-prova-aptidao-profissional',
  templateUrl: './prova-aptidao-profissional.component.html'
})
export class ProvaAptidaoProfissionalComponent implements OnInit, OnDestroy {
  provaAptidaoProfissionals?: IProvaAptidaoProfissional[];
  eventSubscriber?: Subscription;
  currentSearch: string;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected provaAptidaoProfissionalService: ProvaAptidaoProfissionalService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadPage(page?: number): void {
    const pageToLoad: number = page ? page : this.page;
    if (this.currentSearch) {
      this.provaAptidaoProfissionalService
        .search({
          page: pageToLoad - 1,
          query: this.currentSearch,
          size: this.itemsPerPage,
          sort: this.sort()
        })
        .subscribe(
          (res: HttpResponse<IProvaAptidaoProfissional[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
          () => this.onError()
        );
      return;
    }
    this.provaAptidaoProfissionalService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IProvaAptidaoProfissional[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadPage(1);
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInProvaAptidaoProfissionals();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProvaAptidaoProfissional): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProvaAptidaoProfissionals(): void {
    this.eventSubscriber = this.eventManager.subscribe('provaAptidaoProfissionalListModification', () => this.loadPage());
  }

  delete(provaAptidaoProfissional: IProvaAptidaoProfissional): void {
    const modalRef = this.modalService.open(ProvaAptidaoProfissionalDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.provaAptidaoProfissional = provaAptidaoProfissional;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IProvaAptidaoProfissional[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.ngbPaginationPage = this.page;
    this.router.navigate(['/prova-aptidao-profissional'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        search: this.currentSearch,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.provaAptidaoProfissionals = data ? data : [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
