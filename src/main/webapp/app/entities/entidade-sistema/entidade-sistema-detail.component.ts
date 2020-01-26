import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntidadeSistema } from 'app/shared/model/entidade-sistema.model';

@Component({
  selector: 'rv-entidade-sistema-detail',
  templateUrl: './entidade-sistema-detail.component.html'
})
export class EntidadeSistemaDetailComponent implements OnInit {
  entidadeSistema: IEntidadeSistema | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entidadeSistema }) => {
      this.entidadeSistema = entidadeSistema;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
