import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRespostaQuestao } from 'app/shared/model/pedagogico/resposta-questao.model';

@Component({
  selector: 'rv-resposta-questao-detail',
  templateUrl: './resposta-questao-detail.component.html'
})
export class RespostaQuestaoDetailComponent implements OnInit {
  respostaQuestao: IRespostaQuestao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ respostaQuestao }) => {
      this.respostaQuestao = respostaQuestao;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
