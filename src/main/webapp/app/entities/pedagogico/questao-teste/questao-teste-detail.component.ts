import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQuestaoTeste } from 'app/shared/model/pedagogico/questao-teste.model';

@Component({
  selector: 'rv-questao-teste-detail',
  templateUrl: './questao-teste-detail.component.html'
})
export class QuestaoTesteDetailComponent implements OnInit {
  questaoTeste: IQuestaoTeste | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ questaoTeste }) => {
      this.questaoTeste = questaoTeste;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
