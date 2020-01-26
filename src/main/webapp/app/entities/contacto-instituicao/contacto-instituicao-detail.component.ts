import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContactoInstituicao } from 'app/shared/model/contacto-instituicao.model';

@Component({
  selector: 'rv-contacto-instituicao-detail',
  templateUrl: './contacto-instituicao-detail.component.html'
})
export class ContactoInstituicaoDetailComponent implements OnInit {
  contactoInstituicao: IContactoInstituicao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contactoInstituicao }) => {
      this.contactoInstituicao = contactoInstituicao;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
