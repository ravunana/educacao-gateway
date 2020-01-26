import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProvaAptidaoProfissional } from 'app/shared/model/pedagogico/prova-aptidao-profissional.model';

@Component({
  selector: 'rv-prova-aptidao-profissional-detail',
  templateUrl: './prova-aptidao-profissional-detail.component.html'
})
export class ProvaAptidaoProfissionalDetailComponent implements OnInit {
  provaAptidaoProfissional: IProvaAptidaoProfissional | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ provaAptidaoProfissional }) => {
      this.provaAptidaoProfissional = provaAptidaoProfissional;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
