import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContaAluno } from 'app/shared/model/pagamento/conta-aluno.model';

@Component({
  selector: 'rv-conta-aluno-detail',
  templateUrl: './conta-aluno-detail.component.html'
})
export class ContaAlunoDetailComponent implements OnInit {
  contaAluno: IContaAluno | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contaAluno }) => {
      this.contaAluno = contaAluno;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
