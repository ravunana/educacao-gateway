import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEncarregadoEducao } from 'app/shared/model/secretaria/encarregado-educao.model';

@Component({
  selector: 'rv-encarregado-educao-detail',
  templateUrl: './encarregado-educao-detail.component.html'
})
export class EncarregadoEducaoDetailComponent implements OnInit {
  encarregadoEducao: IEncarregadoEducao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ encarregadoEducao }) => {
      this.encarregadoEducao = encarregadoEducao;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
