import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IOcorrencia } from 'app/shared/model/secretaria/ocorrencia.model';

@Component({
  selector: 'rv-ocorrencia-detail',
  templateUrl: './ocorrencia-detail.component.html'
})
export class OcorrenciaDetailComponent implements OnInit {
  ocorrencia: IOcorrencia | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ocorrencia }) => {
      this.ocorrencia = ocorrencia;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
