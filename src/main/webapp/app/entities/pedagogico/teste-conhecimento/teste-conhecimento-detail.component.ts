import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITesteConhecimento } from 'app/shared/model/pedagogico/teste-conhecimento.model';

@Component({
  selector: 'rv-teste-conhecimento-detail',
  templateUrl: './teste-conhecimento-detail.component.html'
})
export class TesteConhecimentoDetailComponent implements OnInit {
  testeConhecimento: ITesteConhecimento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ testeConhecimento }) => {
      this.testeConhecimento = testeConhecimento;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
